import logging
from notion_client.errors import APIResponseError

from app.notion_dbs.todo_database import ToDoDatabase
from app.notion_dbs.routine_database import RoutineDatabase
from app.notion_dbs.schedule_database import ScheduleDatabase
from app.notion_dbs.courses_database import CoursesDatabase
from app.notion_dbs.recurring_database import RecurringDatabase
from app.notion_dbs.personal_database import PersonalDatabase
from app.notion_dbs.sports_database import SportsDatabase
from app.notion_dbs.priorities_database import PriorityDatabase
from app.notion_dbs.jobs_database import JobsDatabase
from app.notion_dbs.lecture_notes_database import LectureNotesDatabase
from app.notion_dbs.job_tasks_database import JobTasksDatabase

from app.adapters.caldav_adapter import CalDAVAdapter

from app.adapters.mongodb_adapter import mongodb_instance

class Strategy:
    def __init__(self, user_data):
        self.user_data = user_data
        self.uid = user_data.get("uid", None)
        self.caldav_client = CalDAVAdapter('https://caldav.icloud.com', user_data.get("IOS_USER", None), user_data.get("IOS_PASSWORD", None))
        self.mongo_db = mongodb_instance
        self._db_cache = {}

    def _get_or_create_database(self, db_type, db_id):
        if self._db_cache.get(db_type) is None:
            try:
                if db_type == 'todo':
                    self._db_cache[db_type] = ToDoDatabase(self.uid, db_id, self.user_data.get("access_token", None))
                elif db_type == 'subjects':
                    self._db_cache[db_type] = CoursesDatabase(self.uid, db_id, self.user_data.get("access_token", None))
                elif db_type == 'lecture_notes':
                    self._db_cache[db_type] = LectureNotesDatabase(self.uid, db_id, self.user_data.get("access_token", None))
                elif db_type == 'job_tasks':
                    self._db_cache[db_type] = JobTasksDatabase(self.uid, db_id, self.user_data.get("access_token", None))
                elif db_type == 'routine':
                    self._db_cache[db_type] = RoutineDatabase(self.uid, db_id, self.user_data.get("access_token", None))
                elif db_type == 'schedule':
                    self._db_cache[db_type] = ScheduleDatabase(self.uid, db_id, self.user_data.get("access_token", None))
                elif db_type == 'recurring':
                    self._db_cache[db_type] = RecurringDatabase(self.uid, db_id, self.user_data.get("access_token", None))
                elif db_type == 'personal':
                    self._db_cache[db_type] = PersonalDatabase(self.uid, db_id, self.user_data.get("access_token", None))
                elif db_type == 'sports':
                    self._db_cache[db_type] = SportsDatabase(self.uid, db_id, self.user_data.get("access_token", None))
                elif db_type == 'priority':
                    self._db_cache[db_type] = PriorityDatabase(self.uid, db_id, self.user_data.get("access_token", None))
                elif db_type == 'jobs':
                    self._db_cache[db_type] = JobsDatabase(self.uid, db_id, self.user_data.get("access_token", None))
            except APIResponseError as e:
                logging.error(f"Error occurred: {e}")
                raise
        return self._db_cache[db_type]

    @property
    def todo_db(self):
        return self._get_or_create_database('todo', self.user_data.get('todo_dbid', None))

    @property
    def courses_db(self):
        return self._get_or_create_database('subjects', self.user_data.get('courses_dbid', None))

    @property
    def lecture_notes_db(self):
        return self._get_or_create_database('lecture_notes', self.user_data.get('lecture_notes_dbid', None))
    
    @property
    def job_tasks_db(self):
        return self._get_or_create_database('job_tasks', self.user_data.get('job_tasks_dbid', None))

    @property
    def routine_db(self):
        return self._get_or_create_database('routine', self.user_data.get('routine_dbid', None))

    @property
    def sports_db(self):
        return self._get_or_create_database('sports', self.user_data.get('sports_dbid', None))
    
    @property
    def schedule_db(self):
        return self._get_or_create_database('schedule', self.user_data.get('schedule_dbid', None))

    @property
    def recurring_db(self):
        return self._get_or_create_database('recurring', self.user_data.get('recurring_dbid', None))
    
    @property
    def personal_db(self):
        return self._get_or_create_database('personal', self.user_data.get('personal_dbid', None))

    @property
    def priorities_db(self):
        return self._get_or_create_database('priority', self.user_data.get('priorities_dbid', None))
    
    @property
    def jobs_db(self):
        return self._get_or_create_database('jobs', self.user_data.get('jobs_dbid', None))