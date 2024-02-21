import os
from typing import Dict, List
from datetime import timedelta, datetime
from app.core.strategy import Strategy
from app.utils.scheduling import adjust_tasks_to_avoid_overlap, schedule_jobs_within_available_times, distribute_tasks_round_robin, has_no_smaller_duration_task


class PriorityStrategy(Strategy):
    def __init__(self, user_data: Dict) -> None:
        super().__init__(user_data)
        self.is_schedule_full = False

    def organize_daily_schedule(self, date: datetime) -> None:
        # TODO: see if subjects have table view to lecture notes. Add if doesn't exist.
        uncompleted_tasks = self.schedule_db.refresh_schedule_progress()
        self.counter = 0
        self.schedule = self.routine_db.get_week_day_routine(date)
        self.current_activities = uncompleted_tasks
        self.remaining_tasks = self.current_activities.copy()
        for index, task in enumerate(self.current_activities):
            task['index'] = index
            shortest_task_duration = min(
                self.remaining_tasks, key=lambda x: x['duration'])['duration']
            self.schedule = self.fit_task_into_schedule(
                self.schedule, task, shortest_task_duration)
            if (self.is_schedule_full):
                break
        self.current_activities = None
        self.remaining_tasks = None

        self.all_tasks = {
            'uncompleted': uncompleted_tasks,
            'to do': self.todo_db.get_tasks(date),
            'jobs': schedule_jobs_within_available_times(date, self.job_tasks_db.get_job_tasks(), self.jobs_db.get_jobs(date.strftime('%A'))),
            'lecture notes': distribute_tasks_round_robin(self.lecture_notes_db.get_lecture_notes()),
            'recurring activities': self.recurring_db.get_projects(date),
            'personal projects': self.personal_db.get_projects(date),
            'sports': self.sports_db.get_sports(date),
        }
        self.counter = 0
        for activity_name in self.priorities_db.get_priorities():
            activity_type = activity_name['name'].lower()
            if (activity_type == 'to do'):
                self.schedule = adjust_tasks_to_avoid_overlap(
                    self.all_tasks['to do'], self.schedule)
            elif (activity_type == 'jobs'):
                self.schedule = adjust_tasks_to_avoid_overlap(
                    self.all_tasks['jobs'], self.schedule)
            elif (activity_type in ['lecture notes', 'recurring activities', 'personal projects', 'sports']):
                self.current_activities = self.all_tasks[activity_type]
                self.remaining_tasks = self.current_activities.copy()
                for index, task in enumerate(self.current_activities):
                    task['index'] = index
                    shortest_task_duration = min(
                        self.remaining_tasks, key=lambda x: x['duration'])['duration']
                    self.schedule = self.fit_task_into_schedule(
                        self.schedule, task, shortest_task_duration)
                    if (self.is_schedule_full):
                        break
            else:
                print('Activity type not found')
            self.counter = 0

        self.schedule = [
            {
                'id': task.get('id', None),
                'name': task.get('name', None),
                'detail': task.get('detail', None),
                'start': task['start'].strftime('%Y-%m-%dT%H:%M:%S.000+08:00'),
                'end': task['end'].strftime('%Y-%m-%dT%H:%M:%S.000+08:00'),
                'progress': task.get('progress', '0%'),
                'display': task.get('display', True),
            }
            for task in self.schedule
        ]
        self.schedule_db.update_schedule_by_week_day(self.schedule)

        if self.caldav_client:
            self.caldav_client.clear_phone_calendar()
            for row in self.schedule:
                # Assuming the 'start' and 'end' in row are now strings, convert them back to datetime objects for calculation
                # Parse the datetime strings back to datetime objects
                dt_start_str = datetime.strptime(
                    row['start'], '%Y-%m-%dT%H:%M:%S.000%z')
                dt_end_str = datetime.strptime(
                    row['end'], '%Y-%m-%dT%H:%M:%S.000%z')

                # Adjust the datetime objects as needed
                dtstart = datetime.combine(
                    datetime.today() + timedelta(days=1), dt_start_str.time())
                # Adjust end time by subtracting one minute
                adj_dtend = dt_end_str - timedelta(minutes=1)
                dtend = datetime.combine(
                    datetime.today() + timedelta(days=1), adj_dtend.time())

                self.caldav_client.phone_add_event(row['name'], dtstart, dtend)
        return 'scheduled'

    def remove_task_from_queue(self, index: int) -> None:
        """
        Removes the task with the given index from the remaining tasks queue.
        """
        index = index - self.counter
        self.remaining_tasks.pop(index)
        self.counter += 1
        
    def fit_task_into_schedule(self, schedule: list, new_task: dict, shortest_task_duration: int) -> list:
        """
        This function takes in the current schedule, a new task, and the shortest task duration and tries to fit the new task
        into the schedule by checking the gaps between activities. If there is enough time, the new task is added to the schedule
        along with a 10 minute break. If there isn't enough time, the function moves on to the next gap. If the next task is a
        fixed task (i.e. it can't be moved), the function moves on to the next gap. If the gap after the new task is too short
        to fit another task, the function moves on to the next gap. If the gap is long enough to fit another task, the start and
        end times of the next task are adjusted accordingly. The function returns the updated schedule.

        Parameters:
        schedule (list): A list of dictionaries representing the current schedule.
        new_task (dict): A dictionary representing the new task to be added to the schedule.
        shortest_task_duration (int): The duration of the shortest task in the schedule.

        Returns:
        list: A list of dictionaries representing the updated schedule.
        """
        if not hasattr(PriorityStrategy, 'no_time_left'):
            self.is_schedule_full = False
        updated_schedule = []
        task_added = False
        for index, task in enumerate(schedule):
            updated_schedule.append(task)
            next_task = None if index == len(
                schedule) - 1 else schedule[index+1]
            if next_task is None:
                break
            gap_duration = ((next_task['start'] - task['end']).total_seconds() / 60.0) - int(
                os.getenv('BREAK_TIME'))  # leave extra 5 minutes for break
            if gap_duration < new_task['duration'] or task_added:
                continue
            new_task['start'] = task['end']
            new_task['end'] = task['end'] + \
                timedelta(minutes=new_task['duration'])
            updated_schedule.append(new_task)
            self.remove_task_from_queue(new_task['index'])
            task_added = True
            break_end_time = new_task['end'] + \
                timedelta(minutes=int(os.getenv('BREAK_TIME')))
            updated_schedule.append({
                'id': None,
                'name': 'Break',
                'detail': None,
                'start': new_task['end'],
                'end': break_end_time,
                'progress': '0%',
                'display': True,
                'task_details': [],
                'is_fixed': True
            })
            if next_task['is_fixed']:
                continue
            adj_gap_duration = (
                next_task['start'] - break_end_time).total_seconds() / 60.0
            if adj_gap_duration > 0 and (adj_gap_duration <= shortest_task_duration or shortest_task_duration == new_task['duration']):
                new_next_start = next_task['start'] - \
                    timedelta(minutes=adj_gap_duration)
                new_next_end = next_task['end'] - \
                    timedelta(minutes=adj_gap_duration)
                next_task['start'] = new_next_start
                next_task['end'] = new_next_end
        if (not task_added and has_no_smaller_duration_task(index+1, new_task['duration'], self.current_activities)):
            self.is_schedule_full = True
        return updated_schedule
