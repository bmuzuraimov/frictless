import caldav
import logging
from datetime import datetime, timedelta
from icalendar import Event, Alarm

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
            self._initialized = True  # Mark the instance as initialized

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
    def phone_add_event(self, name, dtstart, dtend):
        try:
            print(f"Adding event: {name} from {dtstart} to {dtend}")
            event = Event()
            event.add('prodid', '-//Frictless//1.0//EN')  # Add PRODID
            event.add('summary', name)
            event.add('dtstart', dtstart)
            event.add('dtend', dtend)
            event.add('dtstamp', datetime.now())
            event.add('uid', 'frictless-uid'+name+str(dtstart)+str(dtend))

            alarm = Alarm()
            alarm.add("action", "DISPLAY")
            alarm.add('description', name)
            alarm.add("trigger", timedelta(0))
            event.add_component(alarm)

            self.calendar.save_event(event.to_ical())

        except Exception as e:
            logging.error(f"Failed to add event: {e}")
            # Optionally: notify an administrator or monitoring system

    @ensure_client_connected
    def clear_phone_calendar(self):
        try:
            events = self.calendar.events()
            print(events)
            for event in events:
                print(f"Deleting event: {event}")
                event.delete()

        except Exception as e:
            print(f"Failed to clear phone calendar: {e}")
