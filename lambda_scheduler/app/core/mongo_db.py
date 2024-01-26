from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()
import urllib.parse

class MongoSingleton:
    _instance = None
    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(MongoSingleton, cls).__new__(cls)
            MONGODB_USERNAME = os.getenv('MONGODB_USERNAME')
            MONGODB_PASSWORD = os.getenv('MONGODB_PASSWORD')
            MONGODB_DBNAME = os.getenv('MONGODB_DBNAME')
            MONGODB_CLUSTERNAME = os.getenv('MONGODB_CLUSTERNAME')
            username = urllib.parse.quote_plus(MONGODB_USERNAME.encode('utf-8'))
            password = urllib.parse.quote_plus(MONGODB_PASSWORD.encode('utf-8'))
            dbname = urllib.parse.quote_plus(MONGODB_DBNAME.encode('utf-8'))
            clustername = urllib.parse.quote_plus(MONGODB_CLUSTERNAME.encode('utf-8'))
            conn_str = f'mongodb+srv://{username}:{password}@{clustername}.mongodb.net/{dbname}?retryWrites=true&w=majority'
            cls._instance.client = MongoClient(conn_str)
            cls._instance.db = cls._instance.client[MONGODB_DBNAME]
        return cls._instance

    def get_client(self):
        return self._instance.client

    def get_db(self):
        return self._instance.db

mongo_db = MongoSingleton().get_db()