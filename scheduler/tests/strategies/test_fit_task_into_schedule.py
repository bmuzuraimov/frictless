import unittest
from unittest.mock import patch
from datetime import datetime, timedelta
import os
from app.strategies.priority_strategy import PriorityStrategy  # Adjust this import based on your actual module structure

strategy_object = PriorityStrategy({})  # Replace with actual initialization parameters

class TestFitTaskIntoSchedule(unittest.TestCase):
    def setUp(self):
        self.schedule = [
            {'id': 1, 'name': 'Task 1', 'start': datetime(2024, 2, 24, 9, 0), 'end': datetime(2024, 2, 24, 10, 0), 'is_fixed': False},
            {'id': 2, 'name': 'Task 2', 'start': datetime(2024, 2, 24, 11, 0), 'end': datetime(2024, 2, 24, 12, 0), 'is_fixed': True},
            {'id': 3, 'name': 'Task 3', 'start': datetime(2024, 2, 24, 13, 0), 'end': datetime(2024, 2, 24, 14, 0), 'is_fixed': False},
        ]
        self.new_task = {'id': 4, 'name': 'New Task', 'duration': 30, 'is_fixed': False}

    @patch('os.getenv', return_value='10')
    def test_add_task_with_enough_gap(self, mock_getenv):
        updated_schedule = strategy_object.fit_task_into_schedule(self.schedule, self.new_task)
        self.assertEqual(len(updated_schedule), 5, 'Expecting one new task and a break to be added')  # Expecting one new task and a break to be added

    @patch('os.getenv', return_value='10')
    def test_no_gap_for_new_task(self, mock_getenv):
        self.new_task['duration'] = 60  # Adjust duration to ensure no gap is big enough
        updated_schedule = strategy_object.fit_task_into_schedule(self.schedule, self.new_task)
        self.assertEqual(len(updated_schedule), 3, 'Schedule should remain unchanged')  # Schedule should remain unchanged

    @patch('os.getenv', return_value='10')
    def test_adjust_next_task_if_possible(self, mock_getenv):
        self.schedule.append({'id': 5, 'name': 'Task 4', 'start': datetime(2024, 2, 24, 15, 0), 'end': datetime(2024, 2, 24, 16, 0), 'is_fixed': False})
        updated_schedule = strategy_object.fit_task_into_schedule(self.schedule, self.new_task)
        self.assertTrue(updated_schedule[-1]['start'] < datetime(2024, 2, 24, 15, 0), 'The last task should be moved up')  # The last task should be moved up

    @patch('os.getenv', return_value='10')
    def test_schedule_full_with_no_room_for_task(self, mock_getenv):
        self.new_task['duration'] = 120  # Set a duration that cannot be accommodated in any gap
        updated_schedule = strategy_object.fit_task_into_schedule(self.schedule, self.new_task)
        self.assertEqual(len(updated_schedule), 3, "Schedule should remain unchanged, indicating it's full")  # Schedule should remain unchanged, indicating it's full

    # Additional tests can be implemented here to cover other scenarios like
    # handling empty schedules, fixed tasks not being moved, and edge cases.

if __name__ == '__main__':
    unittest.main()
