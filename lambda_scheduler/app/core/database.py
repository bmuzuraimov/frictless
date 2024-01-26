from typing import Dict, List, Union
from app.core.mongo_db import mongo_db
import logging
from notion_client import Client
from notion_client.errors import APIResponseError
from datetime import datetime

logging.basicConfig(
    filename='./logs/errors.log',  # Log file path
    filemode='a',  # Append to the log file (use 'w' to overwrite each time)
    level=logging.ERROR,  # Logging level
    format='%(asctime)s - %(levelname)s - %(message)s - [%(filename)s:%(lineno)d]',  # Log message format
    datefmt='%Y-%m-%d %H:%M:%S'  # Timestamp format
)

class Database:
    def __init__(self, uid, database_id: str, notion_key: str, select_schema: Dict, insert_schema: Dict) -> None:
        if not database_id or not notion_key:
            raise ValueError("Database ID and Notion Key cannot be None or empty.")
        self.uid = uid
        self._client = None
        self.database_id = database_id
        self.notion_key = notion_key
        self._database = None
        self.mongo_db = mongo_db
        self.select_schema = select_schema
        self.insert_schema = insert_schema

    @property
    def client(self) -> Client:
        if self._client is None:
            self._client = Client(auth=self.notion_key)
        return self._client

    @property
    def database(self):
        if self._database is None:
            try:
                self._database = self.client.databases.retrieve(database_id=self.database_id)
            except APIResponseError as e:
                logging.error(f"Error retrieving database: {e}")
                return None
        return self._database

    def query(self, **kwargs) -> List[Dict]:
        """
        Queries the database with given filters and returns the results.
        Returns an empty list if an error occurs.
        """
        try:
            return self.client.databases.query(database_id=self.database_id, **kwargs).get('results')
        except APIResponseError as e:
            logging.error(f"Error querying database: {e}")
            return []
    
    def __get_attr__(self, name: Union[str, None], type: str) -> Union[None, List[str]]:
        NOTION_ATTR = {
            'id': ['id'],
            'title': ['properties', name, type, 0, 'text', 'content'],
            'rich_text': ['properties', name, type, 0, 'text', 'content'],
            'number': ['properties', name, type],
            'checkbox': ['properties', name, type],
            'select': ['properties', name, type, 'name'],
            'multi_select': ['properties', name, type, 'name'],
            'date_start': ['properties', name, 'date', 'start'],
            'date_end': ['properties', name, 'date', 'end'],
            'people': ['properties', name, type, 0, 'name'],
            'files_name': ['properties', name, 'files', 0, 'name'],
            'files_url': ['properties', name, 'files', 0, 'file', 'url'],
            'url': ['properties', name, type],
            'email': ['properties', name, type],
            'phone_number': ['properties', name, type],
            'formula': ['properties', name, type, 'expression'],
            'relation': ['properties', name, type, 0, 'id'],
            'rollup': ['properties', name, type, 'array', 'string'],
            'created_time': ['created_time'],
            'last_edited_time': ['last_edited_time'],
            'page_url': ['url'],
        }
        return NOTION_ATTR.get(type, None)


    def __set_attr__(self, value: Union[str, None], key_1: str, key_2=None) -> Union[None, List[str]]:
        if key_2:
            start_value = value.get(key_1, None)
            end_value = value.get(key_2, None)
            if isinstance(start_value, datetime):
                start_value = start_value.strftime('%Y-%m-%dT%H:%M:%S.000+08:00')
            if isinstance(end_value, datetime):
                end_value = end_value.strftime('%Y-%m-%dT%H:%M:%S.000+08:00')
            return {'date': {'start': start_value, 'end': end_value}}
        else:
            if isinstance(value, datetime):
                value = value.strftime('%Y-%m-%dT%H:%M:%S.000+08:00')
            NOTION_ATTR = {
                'title': {'title': [{'text': {'content': value}}]},
                'rich_text': {'rich_text': [{'text': {'content': value}}]},
                'number': {'number': value},
                'checkbox': {'checkbox': value},
                'select': {'select': {'name': value}},
                'multi_select': {'multi_select': [{'name': value}]},
                'date_start': {'date': {'start': value}},
                'date_end': {'date': {'end': value}},
                'people': {'people': [{'name': value}]},
                'files_name': {'files': [{'name': value}]},
                'files_url': {'files': [{'url': value}]},
                'url': {'url': value},
                'email': {'email': value},
                'phone_number': {'phone_number': value},
                'formula': {'formula': {'expression': value}},
                'relation': {'relation': [] if value is None else [{'id': value}]},
                'rollup': {'rollup': [{'type': 'array', 'array': [{'type': 'string', 'string': value}]}]},
                'created_time': {'created_time': value},
                'last_edited_time': {'last_edited_time': value},
            }
            return NOTION_ATTR.get(key_1, None)

    def get_attribute_value(self, row, column):
        try:
            if not self.select_schema.get(column):
                return None
            for key in self.select_schema[column]:
                row = row[key]
            return row
        except KeyError:
            return row
        except IndexError:
            return row
        except TypeError:
            return None
    
    def set_attribute_value(self, row):
        output = {}
        # TODO: remove key conditions later
        for key, value in row.items():
            if(key == 'start' or key == 'end'):
                output[self.insert_schema[key][0]] = self.__set_attr__(row, 'start', 'end')
            elif(key == 'id'):
                continue
            else:
                output[self.insert_schema[key][0]] = self.__set_attr__(value, self.insert_schema[key][1])
        return output
        
    def create_page(self, page_params, is_template: bool = False):
        try:
            return self.client.pages.create(parent={'database_id': self.database_id}, properties=page_params, is_template=is_template)
        except APIResponseError as e:
            logging.error(f"Error creating page: {e}")
            raise

    def get_page(self, page_id):
        try:
            page = self.client.pages.retrieve(page_id)
        except APIResponseError as e:
            logging.error(f"Error retrieving page: {e}")
            raise
        return page

    def update_page(self, page_id, property_params):
        try:
            self.client.pages.update(page_id=page_id, properties=property_params)
        except APIResponseError as e:
            logging.error(f"Error updating page: {e}")
            raise

    def delete_page(self, page_id):
        try:
            self.client.pages.update(page_id=page_id, properties={}, is_template=False, archived=True)
        except APIResponseError as e:
            logging.error(f"Error deleting page: {e}")
            raise