from app.schedules.fair_schedule import FairSchedule
import json
import logging
from datetime import datetime
# import pytz
import traceback
from dotenv import load_dotenv
load_dotenv()
logger = logging.getLogger()
logger.setLevel(logging.ERROR)
    
def lambda_handler(event, context):
    if(event["httpMethod"] != "POST"):
        return {
            "statusCode": 405,
            "body": "Method not allowed",
        }
    else:
        if isinstance(event["body"], str):
            event["body"] = json.loads(event["body"])
        user_data = event["body"].get("user_data")
        date = datetime.strptime(event["body"].get("date"), "%d-%m-%Y").date()
        try:
            myschedule = FairSchedule(user_data)
            myschedule.organize_daily_schedule(date)
            return {
                "status": "success",
                "statusCode": 200,
                "body": "Success!",
            }
        except Exception as e:
            logger.error(e)
            stack_trace = traceback.format_exc()
            logger.error(stack_trace)
            return {
                "status": "error",
                "statusCode": 500,
                "body": "Internal server error",
            }
