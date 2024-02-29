from datetime import timedelta, datetime
import os
from typing import Dict, List
import itertools

def adjust_tasks_to_avoid_overlap(todo_tasks, schedule_tasks=None, overwrite=False):
    """
    Adjusts the scheduled tasks to avoid overlap with the todo tasks.
    """
    if schedule_tasks is None:
        return todo_tasks
    adjusted_schedule = []  # To hold adjusted scheduled tasks
    for index, scheduled_task in enumerate(schedule_tasks):
        overlap_found = False
        for todo_task in todo_tasks:
            # Check if the scheduled task overlaps with the todo task
            if scheduled_task['start'] < todo_task['end'] and todo_task['start'] < scheduled_task['end'] and not scheduled_task['is_fixed']:
                overlap_found = True
                # Calculate shift amount based on the direction of the shift needed
                if scheduled_task['start'] < todo_task['start']:
                    # Shift scheduled task earlier
                    shift_amount = abs(todo_task['start'] - scheduled_task['end']) + timedelta(minutes=int(os.getenv('BREAK_TIME', '15')))
                    scheduled_task['start'] -= shift_amount
                    scheduled_task['end'] -= shift_amount
                    adjusted_schedule.append({'name': 'Break', 'start': scheduled_task['end'], 'end': todo_task['start'], 'is_fixed': False})
                else:
                    # Shift scheduled task later
                    shift_amount = abs(todo_task['end'] - scheduled_task['start']) + timedelta(minutes=int(os.getenv('BREAK_TIME', '15')))
                    scheduled_task['start'] += shift_amount
                    scheduled_task['end'] += shift_amount
                    adjusted_schedule.append({'name': 'Break', 'start': todo_task['end'], 'end': scheduled_task['start'], 'is_fixed': False})
                break  # Exit the loop after adjusting for the first found overlap
        if not overlap_found:
            adjusted_schedule.append(scheduled_task)
        else:
            # Ensure the adjusted task does not overlap with any todo task again
            # This could be refined further if needed to handle multiple overlaps
            adjusted_schedule.append(scheduled_task)

    # Combine and sort todo and adjusted schedule tasks by start time
    combined_tasks = todo_tasks + adjusted_schedule
    combined_tasks.sort(key=lambda x: x['start'])

    return combined_tasks



def schedule_jobs_within_available_times(date, job_tasks, jobs_info):
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

def distribute_tasks_round_robin(task_subjects: Dict[str, List]) -> list:
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


def has_no_smaller_duration_task(start_index, current_value, dictionary_list):
    """
    Checks if there is no smaller duration value in the given dictionary list, 
    starting from the given index. Returns True if there is no smaller duration, 
    and False otherwise.
    """
    for d in dictionary_list[start_index:]:
        if d.get('duration', float('inf')) < current_value:
            return False
    return True