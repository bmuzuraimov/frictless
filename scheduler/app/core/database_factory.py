import logging

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

class DatabaseFactory:
    def __init__(self) -> None:
        self._db_cache = {}
    @staticmethod
    def _get_or_create_database(self, db_type, db_id):
        if self._db_cache.get(db_type) is None:
            try:
                if db_type == 'todo':
                    self._db_cache[db_type] = ToDoDatabase(self.uid, db_id, self.notion_key)
                elif db_type == 'subjects':
                    self._db_cache[db_type] = CoursesDatabase(self.uid, db_id, self.notion_key)
                elif db_type == 'lecture_notes':
                    self._db_cache[db_type] = LectureNotesDatabase(self.uid, db_id, self.notion_key)
                elif db_type == 'job_tasks':
                    self._db_cache[db_type] = JobTasksDatabase(self.uid, db_id, self.notion_key)
                elif db_type == 'routine':
                    self._db_cache[db_type] = RoutineDatabase(self.uid, db_id, self.notion_key)
                elif db_type == 'schedule':
                    self._db_cache[db_type] = ScheduleDatabase(self.uid, db_id, self.notion_key)
                elif db_type == 'recurring':
                    self._db_cache[db_type] = RecurringDatabase(self.uid, db_id, self.notion_key)
                elif db_type == 'personal':
                    self._db_cache[db_type] = PersonalDatabase(self.uid, db_id, self.notion_key)
                elif db_type == 'sports':
                    self._db_cache[db_type] = SportsDatabase(self.uid, db_id, self.notion_key)
                elif db_type == 'priority':
                    self._db_cache[db_type] = PriorityDatabase(self.uid, db_id, self.notion_key)
                elif db_type == 'jobs':
                    self._db_cache[db_type] = JobsDatabase(self.uid, db_id, self.notion_key)
            except Exception as e:
                logging.error(f"Error occurred: {e}")
                raise
        return self._db_cache[db_type]

    @property
    def todo_db(self):
        return self._get_or_create_database('todo', self.todo_dbid)

    @property
    def courses_db(self):
        return self._get_or_create_database('subjects', self.courses_dbid)

    @property
    def lecture_notes_db(self):
        return self._get_or_create_database('lecture_notes', self.lecture_notes_dbid)
    
    @property
    def job_tasks_db(self):
        return self._get_or_create_database('job_tasks', self.job_tasks_dbid)

    @property
    def routine_db(self):
        return self._get_or_create_database('routine', self.routine_dbid)

    @property
    def sports_db(self):
        return self._get_or_create_database('sports', self.sports_dbid)
    
    @property
    def schedule_db(self):
        return self._get_or_create_database('schedule', self.schedule_dbid)

    @property
    def recurring_db(self):
        return self._get_or_create_database('recurring', self.recurring_dbid)
    
    @property
    def personal_db(self):
        return self._get_or_create_database('personal', self.personal_dbid)

    @property
    def priorities_db(self):
        return self._get_or_create_database('priority', self.priorities_dbid)
    
    @property
    def jobs_db(self):
        return self._get_or_create_database('jobs', self.jobs_dbid)