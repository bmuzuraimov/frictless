# import unittest
# from unittest.mock import patch, MagicMock
# from app.core.schedule import Schedule
# from notion_client.errors import APIResponseError
# import caldav
# from datetime import datetime, timedelta


# class TestSchedule(unittest.TestCase):
#     def setUp(self):
#         user_data = {
#             "uid": "test_uid",
#             "priorities_dbid": "test_priorities_dbid",
#             "todo_dbid": "test_todo_dbid",
#             "schedule_dbid": "test_schedule_dbid",
#             "jobs_dbid": "test_jobs_dbid",
#             "courses_dbid": "test_courses_dbid",
#             "recurring_dbid": "test_recurring_dbid",
#             "personal_dbid": "test_personal_dbid",
#             "routine_dbid": "test_routine_dbid",
#             "sports_dbid": "test_sports_dbid",
#             "lecture_notes_dbid": "test_lecture_notes_dbid",
#             "job_tasks_dbid": "test_job_tasks_dbid",
#             "access_token": "test_access_token",
#             "IOS_USER": "test_ios_user",
#             "IOS_PASSWORD": "test_ios_password"
#         }
#         self.schedule = Schedule(user_data)

#     @patch('app.core.schedule.ToDoDatabase')
#     def test_todo_db(self, mock_todo_db):
#         # Verify that the ToDoDatabase is created when accessed
#         todo_db = self.schedule.todo_db
#         mock_todo_db.assert_called_once()

#     # Similar tests for each of the other database properties

#     @patch('app.core.schedule.caldav')
#     def test_connect_to_caldav_success(self, mock_caldav):
#         # Test successful CalDAV connection
#         principal = MagicMock()
#         mock_caldav.DAVClient.return_value.principal.return_value = principal
#         result = self.schedule._connect_to_caldav()
#         self.assertEqual(result, principal)

#     @patch('app.core.schedule.caldav')
#     def test_connect_to_caldav_failure(self, mock_caldav):
#         # Test CalDAV connection failure
#         mock_caldav.DAVClient.return_value.principal.side_effect = caldav.lib.error.AuthorizationError
#         with self.assertRaises(caldav.lib.error.AuthorizationError):
#             self.schedule._connect_to_caldav()

#     @patch('app.core.schedule.caldav')
#     def test_phone_add_event(self, mock_caldav):
#         # Test adding an event to the phone calendar
#         calendar = MagicMock()
#         principal = MagicMock(calendars=MagicMock(return_value=[calendar]))
#         mock_caldav.DAVClient.return_value.principal.return_value = principal

#         dtstart = datetime.now()
#         dtend = dtstart + timedelta(hours=1)
#         self.schedule.phone_add_event("Test Event", dtstart, dtend)

#         calendar.save_event.assert_called()

#     # Test for clear_phone_calendar
#     # You should add a test for clear_phone_calendar following the pattern of these tests.
#     # Make sure to mock caldav and other external dependencies and verify the behavior of the method.

# if __name__ == '__main__':
#     unittest.main()
