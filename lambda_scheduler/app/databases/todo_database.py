from typing import Any, Dict, List, Union
from datetime import datetime
import json
import os
from app.core.database import Database

class ToDoDatabase(Database):
    def __init__(self, uid, database_id: str, notion_key: str):
        select_schema: Dict[str, List] = {
            'id': self.__get_attr__(None, 'id'),
            'name': self.__get_attr__('Name', 'title'),
            'detail': self.__get_attr__(None, 'page_url'),
            'start': self.__get_attr__('Date', 'date_start'),
            'end': self.__get_attr__('Date', 'date_end'),
            'created_time': self.__get_attr__(None, 'created_time'),
            'last_edited_time': self.__get_attr__(None, 'last_edited_time')
        }
        insert_schema: Dict[str, List] = {
            'id': self.__set_attr__(None, 'id'),
            'name': self.__set_attr__('Name', 'title'),
            'start': self.__set_attr__('Date', 'date_start'),
            'end': self.__set_attr__('Date', 'date_end'),
            'created_time': self.__set_attr__(None, 'created_time'),
            'last_edited_time': self.__set_attr__(None, 'last_edited_time')
        }
        super().__init__(uid, database_id, notion_key, select_schema, insert_schema)

    def get_tasks(self, date: datetime) -> List[Dict[str, Union[str, datetime]]]:
        # TODO: Fix datetime filter
        if(os.environ.get('TEST_MODE') == 'True'):
            results = self.mongo_db['todo_ndb_test_cache'].find_one({'uid': self.uid})['results']
        else:
            start_date = datetime(date.year, date.month, date.day, 0, 0, 0)
            end_date = datetime(date.year, date.month, date.day, 23, 59, 0)
            query_params: Dict[str, Any] = {
                'filter': {
                    "and": [
                        {
                            'property': 'Date',
                            'date': {
                                'on_or_after': start_date.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
                            }
                        },
                        {
                            'property': 'Date',
                            'date': {
                                'on_or_before': end_date.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
                            }
                        }
                    ]
                },
                'sorts': [
                    {
                        'property': 'Date',
                        'direction': 'ascending',
                    }
                ],
            }
            results: List[Dict] = self.query(**query_params)
            # self.mongo_db['todo_ndb_test_cache'].update_one({'uid': self.uid}, {'$set': {'uid': self.uid, 'results': results}}, upsert=True)
        output: List[Dict[str, Union[str, datetime]]] = [
            {
                'id': self.get_attribute_value(task, 'id'),
                'name': self.get_attribute_value(task, 'name'),
                'detail': self.get_attribute_value(task, 'detail'),
                'start': datetime.fromisoformat(self.get_attribute_value(task, 'start')).replace(tzinfo=None),
                'end': datetime.fromisoformat(self.get_attribute_value(task, 'end')).replace(tzinfo=None),
                'progress': '0%',
                'display': True,
                'task_details': [],
                'is_fixed': True
            }
            for task in results
        ]
        return output