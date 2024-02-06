import os
from typing import Dict, List
from datetime import timedelta, datetime
import itertools
from app.core.schedule import Schedule



class FairSchedule(Schedule):
    def __init__(self, user_data:Dict) -> None:
        super().__init__(user_data)
        self.is_schedule_full = False

    def organize_daily_schedule(self, date: datetime) -> None:
        # TODO: see if subjects have table view to lecture notes. Add if doesn't exist.
        self.schedule_db.update_progress()
        self.schedule = self.routine_db.get_week_day_routine(date)
        self.all_tasks = {
                            'to do': self.todo_db.get_tasks(date),
                            'jobs': self.schedule_jobs_within_available_times(date, self.job_tasks_db.get_job_tasks(), self.jobs_db.get_jobs(date.strftime('%A'))),
                            'lecture notes': self.distribute_tasks_round_robin(self.lecture_notes_db.get_lecture_notes()),
                            'recurring activities': self.recurring_db.get_projects(date),
                            'personal projects': self.personal_db.get_projects(date),
                            'sports': self.sports_db.get_sports(date),
                        }
        self.counter = 0
        for activity_name in self.priorities_db.get_priorities():
            activity_type = activity_name['name'].lower()
            if(activity_type == 'to do'):
                self.adjust_tasks_to_avoid_overlap(self.all_tasks['to do'])
                self.schedule.sort(key=lambda x: x['start'])
            elif(activity_type == 'jobs'):
                self.adjust_tasks_to_avoid_overlap(self.all_tasks['jobs'])
                self.schedule.sort(key=lambda x: x['start'])
            elif(activity_type in ['lecture notes', 'recurring activities', 'personal projects', 'sports']):
                self.current_activities = self.all_tasks[activity_type]
                self.remaining_tasks = self.current_activities.copy()
                for index, task in enumerate(self.current_activities):
                    task['index'] = index
                    shortest_task_duration = min(self.remaining_tasks, key=lambda x: x['duration'])['duration']
                    self.schedule = self.fit_task_into_schedule(self.schedule, task, shortest_task_duration)
                    if(self.is_schedule_full):
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
        print(self.ios_username, self.ios_password)
        if(self.ios_username and self.ios_password):
            self.clear_phone_calendar()
            for row in self.schedule:
                dtstart = datetime.combine(datetime.today() + timedelta(days=1), row['start'].time())
                adj_dtend = row['end'] - timedelta(minutes=1)
                dtend = datetime.combine(datetime.today() + timedelta(days=1), adj_dtend.time())
                self.phone_add_event(row['name'], dtstart, dtend)
        else:
            print('iOS username and password not found')
            print(self.ios_username, self.ios_password)

    def adjust_tasks_to_avoid_overlap(self, todo):
        # TODO: ensure opposite tasks are not overlapped
        for scheduled_task in self.schedule:
            for todo_task in todo:
                # Check if the self.schedule task overlaps with the todo task
                if scheduled_task['start'] < todo_task['end'] and todo_task['start'] < scheduled_task['end'] and scheduled_task['is_fixed'] == False:
                    # Calculate shift amount
                    if scheduled_task['start'] < todo_task['start']:
                        # Shift self.schedule task earlier
                        shift_amount = scheduled_task['end'] - todo_task['start'] + timedelta(minutes=int(os.getenv('BREAK_TIME')))
                        scheduled_task['start'] -= shift_amount
                        scheduled_task['end'] -= shift_amount
                    else:
                        # Shift self.schedule task later
                        shift_amount = todo_task['end'] - scheduled_task['start'] + timedelta(minutes=int(os.getenv('BREAK_TIME')))
                        scheduled_task['start'] += shift_amount
                        scheduled_task['end'] += shift_amount
    
    def schedule_jobs_within_available_times(self, date, job_tasks, jobs_info):
        def parse_time(time_str):
            datetime_str = date.strftime('%Y-%m-%d') + ' ' + time_str
            return datetime.strptime(datetime_str, '%Y-%m-%d %H:%M')
        scheduled_jobs = []
        for job_id, job_info in jobs_info.items():
            job_start_time = parse_time(job_info['start'])
            job_end_time = parse_time(job_info['end'])
            available_time = (job_end_time - job_start_time).total_seconds() / 60  # Convert to minutes
            tasks = job_tasks.get(job_id, [])
            current_time = job_start_time
            for task in tasks:
                if task['duration'] <= available_time:
                    task['start'] = current_time
                    current_time += timedelta(minutes=task['duration'])
                    task['end'] = current_time
                    available_time -= task['duration']
                    del task['duration']
                    scheduled_jobs.append(task)
        return scheduled_jobs

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
        if not hasattr(FairSchedule, 'no_time_left'):
            self.is_schedule_full = False
        updated_schedule = []
        task_added = False
        for index, task in enumerate(schedule):
            updated_schedule.append(task)
            next_task = None if index == len(schedule) - 1 else schedule[index+1]
            if next_task is None:
                break
            gap_duration = ((next_task['start'] - task['end']).total_seconds() / 60.0) - int(os.getenv('BREAK_TIME')) # leave extra 5 minutes for break
            if gap_duration < new_task['duration'] or task_added:
                continue
            new_task['start'] = task['end']
            new_task['end'] = task['end'] + timedelta(minutes=new_task['duration'])
            updated_schedule.append(new_task)
            self.remove_task_from_queue(new_task['index'])
            task_added = True
            break_end_time = new_task['end'] + timedelta(minutes=int(os.getenv('BREAK_TIME')))
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
            adj_gap_duration = (next_task['start'] - break_end_time).total_seconds() / 60.0
            if adj_gap_duration > 0 and (adj_gap_duration <= shortest_task_duration or shortest_task_duration == new_task['duration']):
                new_next_start = next_task['start'] - timedelta(minutes=adj_gap_duration)
                new_next_end = next_task['end'] - timedelta(minutes=adj_gap_duration)
                next_task['start'] = new_next_start
                next_task['end'] = new_next_end
        if(not task_added and self._has_no_smaller_duration_task(index+1, new_task['duration'], self.current_activities)):
            self.is_schedule_full = True
        return updated_schedule

    def distribute_tasks_round_robin(self, task_subjects: Dict[str, List]) -> list:
        """
        Distributes the tasks in a fair manner, generating a round-robin queue 
        of tasks from the given dictionary of subjects.
        """
        queue = []
        no_tasks = sum([len(task_subjects[key]) for key in task_subjects])
        key_iterator = itertools.cycle(list(task_subjects.keys()))
        while len(queue) < no_tasks:
            subject = next(key_iterator)
            if(len(task_subjects[subject]) == 0):
                continue
            next_material = task_subjects[subject].pop()
            queue.append(next_material)
        return queue

    def remove_task_from_queue(self, index: int) -> None:
        """
        Removes the task with the given index from the remaining tasks queue.
        """
        index = index - self.counter
        self.remaining_tasks.pop(index)
        self.counter += 1

    def _has_no_smaller_duration_task(self, start_index, current_value, dictionary_list):
        """
        Checks if there is no smaller duration value in the given dictionary list, 
        starting from the given index. Returns True if there is no smaller duration, 
        and False otherwise.
        """
        for d in dictionary_list[start_index:]:
            if d.get('duration', float('inf')) < current_value:
                return False
        return True