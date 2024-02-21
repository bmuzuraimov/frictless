from scheduler.app.strategies.priority_strategy import PriorityStrategy
import json
import logging
from datetime import datetime, timedelta
import traceback
from dotenv import load_dotenv
load_dotenv()
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    if 'Records' in event and len(event['Records']) > 0:
        for record in event['Records']:
            try:
                if isinstance(record["Sns"]["Message"], str):
                    parsed_data = json.loads(record["Sns"]["Message"])
                    user_data = parsed_data.get("user_data")
                    if 'date' in parsed_data:
                        date = datetime.strptime(parsed_data.get("date"), "%d/%m/%Y, %H:%M:%S").date()
                        tomorrow = date + timedelta(days=1)
                        myschedule = PriorityStrategy(user_data)
                        myschedule.organize_daily_schedule(tomorrow)
                    else:
                        print("Date not found in user_data")
                elif isinstance(record["Sns"]["Message"], dict):
                    user_data = record["Sns"]["Message"].get("user_data")
                    if 'date' in record["Sns"]["Message"]:
                        date = datetime.strptime(record["Sns"]["Message"].get("date"), "%d/%m/%Y, %H:%M:%S").date()
                        tomorrow = date + timedelta(days=1)
                        myschedule = PriorityStrategy(user_data)
                        myschedule.organize_daily_schedule(tomorrow)
                    else:
                        print("Date not found in user_data")
            except Exception as e:
                stack_trace = traceback.format_exc()
                print(f"Error processing record: {stack_trace}")
    else:
        print("No records in event")