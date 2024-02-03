import json
from lambda_function import lambda_handler

def test_lambda_handler():
    # Simulate event data
    event = {
        "httpMethod": "POST",
        "body": {
            "date": "11-01-2024",
            "time_zone": "Asia/Hong_Kong", 
            "user_data": {
                "uid": "1680535953293x598895703421589600",
                "access_token": "secret_OzVkNiwCKHY0M3uMeC3tosi1pfFUjTcvGnoJ7WmJ9VJ",
                "IOS_USER": "muzuraimov02@mail.ru",
                "IOS_PASSWORD": "kbsl-rpkq-zeis-jdnz",
                "priorities_dbid": "80fa58ba-a250-4169-882e-8f169691b0b5",
                "todo_dbid": "39405987c03144009157dd1a593b0219",
                "schedule_dbid": "335a2dda-1c7a-48f6-b21d-82e93e83b9ce",
                "jobs_dbid": "cea693a1fd1e4326b83e00c3e3eaedc5",
                "courses_dbid": "24296e23-12e1-404d-9e89-9fca7a4ebc80",
                "recurring_dbid": "9f71a15c30b1447ca884548aa3fadfde",
                "personal_dbid": "36f8c30e44c5430aa5de9afebe006859",
                "routine_dbid": "ebc2d5c9-d6af-4748-b516-9d57b08d81f5",
                "sports_dbid": "7e185924742b4491a9737ed8412defcf",
                "lecture_notes_dbid": "021d41e4-6929-4c3a-a8c6-55fac9dc47db",
                "job_tasks_dbid": "1ce07f1ad35a464d81f993422c210c56",
                "email": "21219494@life.hkbu.edu.hk",
            }
        }
    }

    # Simulate context object (Can be a mock or a simple object with necessary attributes)
    class Context:
        function_name = 'test_lambda_function'
        memory_limit_in_mb = 128
        # Add other necessary context attributes and methods if needed

    context = Context()

    # Call the lambda handler
    response = lambda_handler(event, context)

    # Assertions to validate the response from your Lambda function
    # For example, you can assert the status code or the body of the response
    assert response['statusCode'] == 200
    assert json.loads(response['body']) == {'result': 'success'}
