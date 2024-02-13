from app.schedules.fair_schedule import FairSchedule
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
                        myschedule = FairSchedule(user_data)
                        myschedule.organize_daily_schedule(tomorrow)
                    else:
                        logger.error("Date not found in user_data")
            except Exception as e:
                stack_trace = traceback.format_exc()
                logger.error(f"Error processing record: {stack_trace}")
    else:
        logger.error("No records in event")

