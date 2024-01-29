from typing import Dict, List
import os
import json
from app.core.database import Database

class JobTasksDatabase(Database):
    def __init__(self,  uid, database_id: str, notion_key: str):
        select_schema: Dict[str, List] = {
            'id': self.__get_attr__(None, 'id'),
            'name': self.__get_attr__('Name', 'title'),
            'detail': self.__get_attr__(None, 'page_url'),
            'to_do': self.__get_attr__('To do', 'checkbox'),
            'job': self.__get_attr__('Job', 'relation'),
            'duration': self.__get_attr__('Duration', 'number'),
            'created_time': self.__get_attr__(None, 'created_time'),
            'last_edited_time': self.__get_attr__(None, 'last_edited_time')
        }
        insert_schema: Dict[str, List] = {
            'id': self.__set_attr__(None, 'id'),
            'name': self.__set_attr__('Name', 'title'),
            'to_do': self.__set_attr__('To do', 'checkbox'),
            'job': self.__set_attr__('Job', 'relation'),
            'duration': self.__set_attr__('Duration', 'number'),
            'created_time': self.__set_attr__(None, 'created_time'),
            'last_edited_time': self.__set_attr__(None, 'last_edited_time')
        }
        super().__init__(uid, database_id, notion_key, select_schema, insert_schema)

    def get_job_tasks(self) -> Dict[str, List]:
        output:Dict[str, List] = {}
        if(os.environ.get('STAGE') == 'dev'):
            results = self.mongo_db['job_tasks_ndb_test_cache'].find_one({'uid': self.uid})['results']
        else:
            query_params = {
                'filter': {
                    'and': [
                        {
                            'property': 'To do',
                            'checkbox': {
                                'equals': True
                            }
                        },
                        {
                            'property': 'Job',  # Assuming 'Job' is the name of the relation property
                            'relation': {
                                'is_not_empty': True
                            }
                        }
                    ]
                },
                'sorts': [
                    {
                        'property': 'Name',
                        'direction': 'ascending',
                        'timestamp': 'last_edited_time'
                    }
                ],
                'property_select': [
                    'id',
                    'Name',
                    'Course',
                    'Document',
                    'Duration',
                    'Min. per page'
                ]
            }
            results = self.query(**query_params)
            # self.mongo_db['job_tasks_ndb_test_cache'].update_one({'uid': self.uid}, {'$set': {'uid': self.uid, 'results': results}}, upsert=True)
        for detail in results:
            job = self.get_attribute_value(detail, 'job')
            duration = self.get_attribute_value(detail, 'duration')
            if duration is None:
                continue
            if job not in output:
                output[job] = []
            output[job].append({
                'id': self.get_attribute_value(detail, 'id'),
                'name': self.get_attribute_value(detail, 'name'),
                'detail': self.get_attribute_value(detail, 'detail'),
                'start': None,
                'end': None,
                'duration': duration,
                'progress': '0%',
                'display': True,
                'task_details': job,
                'is_fixed': False,
            })
        return output