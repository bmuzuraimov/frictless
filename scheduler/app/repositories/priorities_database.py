from typing import Dict, List, Union
from app.core.database import Database
from datetime import datetime
import os

class PriorityDatabase(Database):
    VALID_NAMES = ['To do', 'Jobs', 'Lecture notes', 'Recurring activities', 'Personal projects', 'Sports']
    VALID_PRIORITIES = [100, 80, 60, 40, 20, 10]

    def __init__(self, uid, database_id: str, notion_key: str) -> None:
        """
        Initialize the PriorityDatabase with user ID, database ID, and Notion API key.

        Parameters:
        uid (str): The user ID.
        database_id (str): The ID of the Notion database.
        notion_key (str): The Notion API key.
        """
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

    def filter_valid_priorities(self, priorities):
        """
        Filter priorities based on valid names and priority values.

        Parameters:
        priorities (List[Dict]): A list of priority dictionaries fetched from the database.

        Returns:
        List[Dict]: A list of filtered priority dictionaries.
        """
        filtered = []
        for priority in priorities:
            name = self.get_attribute_value(priority, 'name')
            priority_value = int(self.get_attribute_value(priority, 'priority'))
            if name in self.VALID_NAMES and priority_value in self.VALID_PRIORITIES:
                filtered.append({
                    'id': self.get_attribute_value(priority, 'id'),
                    'name': name,
                    'priority': priority_value
                })
        filtered.sort(key=lambda x: x['priority'], reverse=True)
        return filtered
    
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
            self.mongo_db['priorities_ndb_test_cache'].update_one({'uid': self.uid}, {'$set': {'uid': self.uid, 'results': results}}, upsert=True)
        
        # Filter results based on valid names and priorities
        output = self.filter_valid_priorities(results)
        return output
