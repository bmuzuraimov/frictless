from typing import Dict, List, Union
from app.core.database import Database
from datetime import datetime
import json
import os

class PriorityDatabase(Database):
    def __init__(self, uid, database_id: str, notion_key: str) -> None:
        select_schema: Dict[str, List] = {
            'id': self.__get_attr__(None, 'id'),
            'name': self.__get_attr__('Name', 'title'),
            'priority': self.__get_attr__('Priority', 'select'),
            'created_time': self.__get_attr__(None, 'created_time'),
            'last_edited_time': self.__get_attr__(None, 'last_edited_time')
        }
        insert_schema: Dict[str, List] = {
            'id': self.__set_attr__(None, 'id'),
            'name': self.__set_attr__('Name', 'title'),
            'priority': self.__set_attr__('Priority', 'select'),
            'created_time': self.__set_attr__(None, 'created_time'),
            'last_edited_time': self.__set_attr__(None, 'last_edited_time')
        }
        super().__init__(uid, database_id, notion_key, select_schema, insert_schema)

    def get_priorities(self) -> List[Dict[str, Union[str, datetime, int]]]:
        output: List[Dict[str, Union[str, datetime, int]]] = []
        if(os.environ.get('STAGE') == 'dev'):
            results = self.mongo_db['priorities_ndb_test_cache'].find_one({'uid': self.uid})['results']
        else:
            query_params: Dict[str, List[Dict[str, str]]] = {
                "sorts": [
                    {
                        "property": "Priority",
                        "direction": "descending"
                    }
                ]
            }
            results = self.query(**query_params)
            # self.mongo_db['priorities_ndb_test_cache'].update_one({'uid': self.uid}, {'$set': {'uid': self.uid, 'results': results}}, upsert=True)
        for priority in results:
            new_priority: Dict[str, Union[str, datetime]] = {}
            new_priority['id'] = self.get_attribute_value(priority, 'id')
            new_priority['name'] = self.get_attribute_value(priority, 'name')
            new_priority['priority'] = int(self.get_attribute_value(priority, 'priority'))
            output.append(new_priority)
        output.sort(key=lambda x: x['priority'], reverse=True)
        return output
