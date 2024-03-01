import caldav
import logging
from datetime import datetime, timedelta
from icalendar import Event, Alarm
from app.adapters.mongodb_adapter import mongodb_instance


class CalDAVAdapter:
    _instance = None  # Class variable that holds the singleton instance

    def __new__(cls, url, username, password):
        # If no instance exists, create one; otherwise, return the existing one
        if cls._instance is None:
            cls._instance = super(CalDAVAdapter, cls).__new__(cls)
            cls._instance._initialized = False  # To initialize instance variables once
        return cls._instance

    def __init__(self, url, username, password):
        # Initialize the instance variables only if they haven't been initialized
        if not self._initialized:
            if not url or not username or not password:
                print("CalDAV credentials not provided.")
                self.client = None
                self.calendar = None
            else:
                self.client = self._connect_to_caldav(url, username, password)
                self.calendar = self.client.principal().calendars()[0]
            self._initialized = True

    def _connect_to_caldav(self, url, username, password):
        try:
            return caldav.DAVClient(url=url, username=username, password=password)
        except caldav.lib.error.AuthorizationError:
            print("Failed to authorize with the CalDAV server.")
            raise
        except caldav.lib.error.NotFoundError:
            print("Specified resource not found on the CalDAV server.")
            raise
        except caldav.lib.error.Error as e:  # A general caldav exception
            print(f"An error occurred with the CalDAV server: {e}")
            raise

    def ensure_client_connected(func):
        def wrapper(self, *args, **kwargs):
            if not self.client:
                print("Client is not connected. Please check your CalDAV credentials.")
                return None
            return func(self, *args, **kwargs)
        return wrapper

    @ensure_client_connected
    def phone_add_event(self, caldav_uid, name, dtstart, dtend):
        try:
            event = Event()
            event.add('prodid', '-//Frictless//1.0//EN')
            event.add('summary', name)
            event.add('dtstart', dtstart)
            event.add('dtend', dtend)
            event.add('dtstamp', datetime.now())
            event.add('uid', caldav_uid)

            alarm = Alarm()
            alarm.add("action", "DISPLAY")
            alarm.add('description', name)
            alarm.add("trigger", timedelta(0))
            event.add_component(alarm)

            cal_data = self.calendar.save_event(event.to_ical())
            return str(cal_data.url)

        except Exception as e:
            logging.error(f"Failed to add event: {e}")
            return None

    @ensure_client_connected
    def clear_phone_calendar(self, uid):
        try:
            events = mongodb_instance['caldav_uids'].find({'uid': uid, 'date': (datetime.today() + timedelta(days=1)).strftime('%Y-%m-%d')})
            # results = mongodb_instance['caldav_uids'].delete_many({'uid': uid, 'date': (datetime.today() + timedelta(days=1)).strftime('%Y-%m-%d')})
            for event in events:
                self.calendar.event_by_url(event['ical_url']).delete()
        except Exception as e:
            print(f"Failed to clear phone calendar: {e}")

    @ensure_client_connected
    def add_events(self, uid, events):
        self.clear_phone_calendar(uid)
        for event in events:
            dt_start_str = datetime.strptime(
            event['start'], '%Y-%m-%dT%H:%M:%S.000%z')
            dt_end_str = datetime.strptime(
                event['end'], '%Y-%m-%dT%H:%M:%S.000%z')
            dtstart = datetime.combine(
                datetime.today() + timedelta(days=1), dt_start_str.time())
            adj_dtend = dt_end_str - timedelta(minutes=1)
            dtend = datetime.combine(
                datetime.today() + timedelta(days=1), adj_dtend.time())
            
            caldav_uid = 'frictless_uid-' + event['name'] + event['start'] + event['end']
            ical_url = self.phone_add_event(caldav_uid, event['name'], dtstart, dtend)
            mongodb_instance['caldav_uids'].insert_one({'uid': uid, 'date': dtstart.date().strftime('%Y-%m-%d'), 'caldav_uid': caldav_uid, 'ical_url': ical_url})
