from typing import Dict, List, Union
import os
from app.core.database import Database

class JobsDatabase(Database):
    def __init__(self,  uid, database_id, notion_key) -> None:
        select_schema: Dict[str, List] = {
            'id': self.__get_attr__(None, 'id'),
            'name': self.__get_attr__('Name', 'title'),
            'detail': self.__get_attr__(None, 'page_url'),
            'start': self.__get_attr__('Start', 'rich_text'),
            'end': self.__get_attr__('End', 'rich_text'),
            'created_time': self.__get_attr__(None, 'created_time'),
            'last_edited_time': self.__get_attr__(None, 'last_edited_time')
        }
        insert_schema: Dict[str, List] = {
            'id': self.__set_attr__(None, 'id'),
            'name': self.__set_attr__('Name', 'title'),
            'start': self.__set_attr__('Start', 'rich_text'),
            'end': self.__set_attr__('End', 'rich_text'),
            'created_time': self.__set_attr__(None, 'created_time'),
            'last_edited_time': self.__set_attr__(None, 'last_edited_time')
        }
        super().__init__(uid, database_id, notion_key, select_schema, insert_schema)

    def get_jobs(self, weekday: str) -> List[Dict[str, Union[str, List]]]:
        """
        Returns a list of all jobs id for a given weekday
        """
        if(os.environ.get('STAGE') == 'dev'):
            results = self.mongo_db['jobs_ndb_test_cache'].find_one({ 'uid': self.uid, 'weekday': weekday })['results']
        else:
            query: Dict[str, Dict] = {
                'filter': {
                    'property': 'Week days',
                    'multi_select': {
                        'contains': weekday
                    }
                }
            }
            results = self.query(**query)
            self.mongo_db['jobs_ndb_test_cache'].update_one({'uid': self.uid}, {'$set': { 'uid': self.uid, 'weekday': weekday, 'results': results }}, upsert=True)
        results: List[Dict[str, Union[str, List]]] = {
                        self.get_attribute_value(row, 'id'): { 
                            'name': self.get_attribute_value(row, 'name'),
                            'detail': self.get_attribute_value(row, 'detail'),
                            'start': self.get_attribute_value(row, 'start'), 
                            'end': self.get_attribute_value(row, 'end') 
                        } 
                        for row in results
                    }
        return results