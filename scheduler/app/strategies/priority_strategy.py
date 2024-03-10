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

        self.schedule = self.routine_db.get_week_day_routine(date)
        self.all_tasks = {
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
                for index, task in enumerate(self.all_tasks[activity_type]):
                    task['index'] = index
                    self.schedule = self.fit_task_into_schedule(
                        self.schedule, task)
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


        self.caldav_client.add_events(self.uid, date, self.schedule)

        return 'scheduled'

    def fit_task_into_schedule(self, schedule: list, new_task: dict) -> list:
        task_added = False
        break_time = int(os.getenv('BREAK_TIME', 10))  # Default to 10 minutes if not set

        updated_schedule = []

        if(new_task['duration'] == 0):
            return schedule
        
        for index in range(len(schedule) - 1):
            current_task = schedule[index]
            next_task = schedule[index+1]
            updated_schedule.append(current_task)

            if not task_added:
                gap_duration = ((next_task['start'] - current_task['end']).total_seconds() / 60.0)
                if gap_duration < new_task['duration']:
                    continue
                new_task_start = current_task['end']
                new_task_end = current_task['end'] + timedelta(minutes=new_task['duration'])
                updated_schedule.append({
                    'id': new_task.get('id', None),
                    'name': new_task['name'],
                    'detail': new_task.get('detail', None),
                    'start': new_task_start,
                    'end': new_task_end,
                    'progress': '0%',
                    'display': True,
                    'task_details': new_task.get('task_details', []),
                    'is_fixed': new_task['is_fixed']
                })
                task_added = True
                gap_duration = ((next_task['start'] - new_task_end).total_seconds() / 60.0)
                if gap_duration < break_time:
                    continue
                updated_schedule.append({
                    'id': None,
                    'name': 'Break',
                    'detail': None,
                    'start': new_task_end,
                    'end': new_task_end + timedelta(minutes=break_time),
                    'progress': '0%',
                    'display': True,
                    'task_details': [],
                    'is_fixed': True
                })

        if len(schedule) > 0:
            updated_schedule.append(schedule[-1])
        
        return updated_schedule
