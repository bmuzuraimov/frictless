import logging
import caldav
from datetime import datetime, timedelta
from icalendar import Event, Alarm
from notion_client.errors import APIResponseError

from app.databases.todo_database import ToDoDatabase
from app.databases.routine_database import RoutineDatabase
from app.databases.schedule_database import ScheduleDatabase
from app.databases.courses_database import CoursesDatabase
from app.databases.recurring_database import RecurringDatabase
from app.databases.personal_database import PersonalDatabase
from app.databases.sports_database import SportsDatabase
from app.databases.priorities_database import PriorityDatabase
from app.databases.jobs_database import JobsDatabase
from app.databases.lecture_notes_database import LectureNotesDatabase
from app.databases.job_tasks_database import JobTasksDatabase




class Schedule:
    def __init__(self, user_data):
        self.uid = user_data.get("uid", None)
        self.priorities_dbid = user_data.get("priorities_dbid", None)
        self.todo_dbid = user_data.get("todo_dbid", None)
        self.schedule_dbid = user_data.get("schedule_dbid", None)
        self.jobs_dbid = user_data.get("jobs_dbid", None)
        self.courses_dbid = user_data.get("courses_dbid", None)
        self.recurring_dbid = user_data.get("recurring_dbid", None)
        self.personal_dbid = user_data.get("personal_dbid", None)
        self.routine_dbid = user_data.get("routine_dbid", None)
        self.sports_dbid = user_data.get("sports_dbid", None)
        self.lecture_notes_dbid = user_data.get("lecture_notes_dbid", None)
        self.job_tasks_dbid = user_data.get("job_tasks_dbid", None)
        self.notion_key = user_data.get("access_token", None)
        self.ios_url = 'https://caldav.icloud.com'
        self.ios_username = user_data.get("IOS_USER", None)
        self.ios_password = user_data.get("IOS_PASSWORD", None)
        self._db_cache = {}

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
            except APIResponseError as e:
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

    def _connect_to_caldav(self):
        try:
            return caldav.DAVClient(url=self.ios_url, username=self.ios_username, password=self.ios_password).principal()
        except caldav.lib.error.AuthorizationError:
            logging.error("Failed to authorize with the CalDAV server.")
            raise
        except caldav.lib.error.NotFoundError:
            logging.error("Specified resource not found on the CalDAV server.")
            raise
        except caldav.lib.error.Error as e:  # A general caldav exception
            logging.error(f"An error occurred with the CalDAV server: {e}")
            raise

    def phone_add_event(self, name, dtstart, dtend):
        try:
            principal = self._connect_to_caldav()
            calendars = principal.calendars()

            if calendars:
                calendar = calendars[0]
                
                event = Event()
                event.add('prodid', '-//Nodeon//1.0//EN')  # Add PRODID
                event.add('summary', name)
                event.add('dtstart', dtstart)
                event.add('dtend', dtend)
                event.add('dtstamp', datetime.now())

                alarm = Alarm()
                alarm.add("action", "DISPLAY")
                alarm.add('description', name)
                alarm.add("trigger", timedelta(0))
                event.add_component(alarm)

                calendar.save_event(event.to_ical())

        except Exception as e:
            logging.error(f"Failed to add event: {e}")
            # Optionally: notify an administrator or monitoring system

    # def clear_phone_calendar(self):
    #     try:
    #         principal = self._connect_to_caldav()
    #         calendar = principal.calendars()[0]

    #         tomorrow = datetime.now() + timedelta(days=1)
    #         start_date = datetime(tomorrow.year, tomorrow.month, tomorrow.day, 0, 0, 0)
    #         end_date = datetime(tomorrow.year, tomorrow.month, tomorrow.day, 23, 0, 0)
            
    #         events = calendar.date_search(start_date, end_date)
            
    #         for event in events:
    #             logging.error(event.data)
    #             event.delete()
    #     except Exception as e:
    #         logging.error(f"Failed to clear phone calendar: {e}")


    def clear_phone_calendar(self):
        try:
            principal = self._connect_to_caldav()
            calendar = principal.calendars()[0]

            # Fetch all events from the calendar.
            # Depending on the library you're using, you might need a different method to fetch all events.
            events = calendar.events()

            for event in events:
                logging.error(event.data)
                event.delete()

        except Exception as e:
            logging.error(f"Failed to clear phone calendar: {e}")





