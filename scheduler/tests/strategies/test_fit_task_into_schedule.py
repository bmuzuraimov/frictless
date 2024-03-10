import unittest
from unittest.mock import patch
from datetime import datetime, timedelta
import os
from app.strategies.priority_strategy import PriorityStrategy

strategy_object = PriorityStrategy({})

class TestFitTaskIntoSchedule(unittest.TestCase):
    def setUp(self):
        self.schedule = [
            {'id': 1, 'name': 'Task 1', 'start': datetime(2024, 2, 24, 9, 0), 'end': datetime(2024, 2, 24, 10, 0), 'is_fixed': False},
            {'id': 2, 'name': 'Task 2', 'start': datetime(2024, 2, 24, 11, 0), 'end': datetime(2024, 2, 24, 12, 0), 'is_fixed': True},
            {'id': 3, 'name': 'Task 3', 'start': datetime(2024, 2, 24, 13, 0), 'end': datetime(2024, 2, 24, 14, 0), 'is_fixed': False},
        ]
        self.new_task = {'id': 4, 'name': 'New Task', 'duration': 30, 'detail': None, 'is_fixed': False}

    @patch('os.getenv', return_value='10')
    def test_add_task_with_enough_gap(self, mock_getenv):
        self.new_task['duration'] = 50
        updated_schedule = strategy_object.fit_task_into_schedule(self.schedule, self.new_task)
        self.assertEqual(len(updated_schedule), 5, 'Expecting one new task and a break to be added')  # Expecting one new task and a break to be added

    def test_task_with_exact_gap_fit(self):
        """Test adding a task where it fits exactly into the gap, including break time."""
        self.new_task['duration'] = 60  # Adjust based on actual gap calculation logic
        updated_schedule = strategy_object.fit_task_into_schedule(self.schedule, self.new_task)
        self.assertEqual(len(updated_schedule), 4, "Expected the new task to fit exactly into the gap")

    @patch('os.getenv', return_value='10')
    def test_schedule_full_with_no_room_for_task(self, mock_getenv):
        self.new_task['duration'] = 120  # Set a duration that cannot be accommodated in any gap
        updated_schedule = strategy_object.fit_task_into_schedule(self.schedule, self.new_task)
        self.assertEqual(len(updated_schedule), 3, "Schedule should remain unchanged, indicating it's full")  # Schedule should remain unchanged, indicating it's full

    def test_empty_schedule(self):
        """Test adding a task to an empty schedule."""
        self.schedule.clear()
        updated_schedule = strategy_object.fit_task_into_schedule(self.schedule, self.new_task)
        self.assertEqual(len(updated_schedule), 0, "Expected the empty schedule")

    def test_new_task_zero_duration(self):
        """Test adding a new task with zero duration."""
        self.new_task['duration'] = 0
        updated_schedule = strategy_object.fit_task_into_schedule(self.schedule, self.new_task)
        self.assertEqual(len(updated_schedule), 3, "Schedule should remain unchanged when adding a task with zero duration")

if __name__ == '__main__':
    unittest.main()
