FROM public.ecr.aws/lambda/python:3.11

# Copy requirements.txt
COPY requirements.txt ${LAMBDA_TASK_ROOT}

# Install the specified packages
RUN pip install -r requirements.txt

# Copy function code
COPY users.json ${LAMBDA_TASK_ROOT}
COPY /app ${LAMBDA_TASK_ROOT}/app/
COPY .env ${LAMBDA_TASK_ROOT}
COPY lambda_function.py ${LAMBDA_TASK_ROOT}

# Set the correct permissions for the .env file
RUN chmod 644 ${LAMBDA_TASK_ROOT}/.env

CMD [ "lambda_function.lambda_handler" ]