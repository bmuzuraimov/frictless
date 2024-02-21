import unittest
from unittest.mock import patch
from datetime import datetime

from app.utils.scheduling import adjust_tasks_to_avoid_overlap

class TestAdjustTasks(unittest.TestCase):
    @patch('os.getenv', side_effect=lambda k, _: {'BREAK_TIME': '15'}.get(k))
    def test_no_overlap(self, mock_getenv):
        todo = [{'start': datetime(2022, 1, 1, 9), 'end': datetime(2022, 1, 1, 10)}]
        schedule = [{'start': datetime(2022, 1, 1, 10, 15), 'end': datetime(2022, 1, 1, 11, 15), 'is_fixed': False}]
        expected_schedule = [
            {'start': datetime(2022, 1, 1, 9), 'end': datetime(2022, 1, 1, 10)},
            {'start': datetime(2022, 1, 1, 10, 15), 'end': datetime(2022, 1, 1, 11, 15), 'is_fixed': False}
            ]
        adjusted_schedule = adjust_tasks_to_avoid_overlap(todo, schedule)
        self.assertEqual(adjusted_schedule, expected_schedule)

    @patch('os.getenv', side_effect=lambda k, _: {'BREAK_TIME': '15'}.get(k))
    def test_tasks_shifted_earlier(self, mock_getenv):
        todo = [{'start': datetime(2022, 1, 1, 10), 'end': datetime(2022, 1, 1, 11)}]
        schedule = [{'start': datetime(2022, 1, 1, 9, 45), 'end': datetime(2022, 1, 1, 10, 45), 'is_fixed': False}]

        expected_schedule = [
            {'start': datetime(2022, 1, 1, 8, 45), 'end': datetime(2022, 1, 1, 9, 45), 'is_fixed': False},
            {'start': datetime(2022, 1, 1, 10), 'end': datetime(2022, 1, 1, 11)}
            ]
        adjusted_schedule = adjust_tasks_to_avoid_overlap(todo, schedule)
        self.assertEqual(adjusted_schedule, expected_schedule)

    @patch('os.getenv', side_effect=lambda k, _: {'BREAK_TIME': '15'}.get(k))
    def test_tasks_shifted_later(self, mock_getenv):
        todo = [{'start': datetime(2022, 1, 1, 9), 'end': datetime(2022, 1, 1, 10)}]
        schedule = [{'start': datetime(2022, 1, 1, 9, 45), 'end': datetime(2022, 1, 1, 10, 45), 'is_fixed': False}]

        expected_schedule = [
            {'start': datetime(2022, 1, 1, 9), 'end': datetime(2022, 1, 1, 10)},
            {'start': datetime(2022, 1, 1, 10, 15), 'end': datetime(2022, 1, 1, 11, 15), 'is_fixed': False}
            ]
        adjusted_schedule = adjust_tasks_to_avoid_overlap(todo, schedule)

        self.assertEqual(adjusted_schedule, expected_schedule)

    # Add more test methods as necessary
    @patch('os.getenv', side_effect=lambda k, _: {'BREAK_TIME': '15'}.get(k))
    def test_no_schedule(self, mock_getenv):
        todo = [{'start': datetime(2022, 1, 1, 9), 'end': datetime(2022, 1, 1, 10)}]
        schedule = None

        expected_schedule = todo
        adjusted_schedule = adjust_tasks_to_avoid_overlap(todo, schedule)

        self.assertEqual(adjusted_schedule, expected_schedule)

if __name__ == '__main__':
    unittest.main()
