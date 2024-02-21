import unittest
from datetime import datetime
from dotenv import load_dotenv
import os

# Load the .env.test file
load_dotenv(dotenv_path='.env.test')

from app.strategies.priority_strategy import PriorityStrategy

class TestPriorityStrategy(unittest.TestCase):
    def test_todo_fit(self):
        user_data = {
                        "uid": os.getenv('UID'),
                        "access_token": os.getenv('ACCESS_TOKEN'),
                        "IOS_USER": os.getenv('IOS_USER'),
                        "IOS_PASSWORD": os.getenv('IOS_PASSWORD'),
                        "courses_dbid": os.getenv('COURSES_DBID'),
                        "job_tasks_dbid": os.getenv('JOB_TASKS_DBID'),
                        "jobs_dbid": os.getenv('JOBS_DBID'),
                        "lecture_notes_dbid": os.getenv('LECTURE_NOTES_DBID'),
                        "personal_dbid": os.getenv('PERSONAL_DBID'),
                        "priorities_dbid": os.getenv('PRIORITIES_DBID'),
                        "recurring_dbid": os.getenv('RECURRING_DBID'),
                        "routine_dbid": os.getenv('ROUTINE_DBID'),
                        "schedule_dbid": os.getenv('SCHEDULE_DBID'),
                        "sports_dbid": os.getenv('SPORTS_DBID'),
                        "todo_dbid": os.getenv('TODO_DBID'),
                        "email": os.getenv('EMAIL'),
                    }
        fair_schedule = PriorityStrategy(user_data)
        date = datetime.strptime('20/02/2024, 17:39:43', "%d/%m/%Y, %H:%M:%S").date()
        self.assertEqual(fair_schedule.organize_daily_schedule(date), 'scheduled', "Expected daily schedule organization to return 'scheduled'")

if __name__ == '__main__':
    unittest.main()