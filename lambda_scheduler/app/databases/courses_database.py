from typing import Dict, List
import os
import json
from app.core.database import Database


class CoursesDatabase(Database):
    def __init__(self, uid, database_id, notion_key) -> None:
        select_schema: Dict[str, List] = {
            'id': self.__get_attr__(None, 'id'),
            'name': self.__get_attr__('Name', 'title'),
            'url': self.__get_attr__('Course homepage', 'url'),
            'exam_date': self.__get_attr__('Exam date', 'date_start'),
            'textbook': self.__get_attr__('Text book', 'rich_text'),
            'created_time': self.__get_attr__(None, 'created_time'),
            'last_edited_time': self.__get_attr__(None, 'last_edited_time')
        }
        insert_schema: Dict[str, List] = {
            'id': self.__set_attr__(None, 'id'),
            'name': self.__set_attr__('Name', 'title'),
            'url': self.__set_attr__('Course homepage', 'url'),
            'exam_date': self.__set_attr__('Exam date', 'date_start'),
            'textbook': self.__set_attr__('Text book', 'rich_text'),
            'created_time': self.__set_attr__(None, 'created_time'),
            'last_edited_time': self.__set_attr__(None, 'last_edited_time'),
        }
        super().__init__(uid, database_id, notion_key, select_schema, insert_schema)

    def get_courses_id(self) -> Dict[str, List]:
        """
        Queries the tasks_by_subject database in Notion for all tasks associated with each subject.
        Returns:
            Dict: A dictionary containing subject IDs as keys and a list of task information as values.
        """
        if(os.environ.get('TEST_MODE') == 'True'):
            results = self.mongo_db['courses_ndb_test_cache'].find_one({'uid': self.uid})['results']
        else:
            query = {}
            results = self.query(**query)
            # self.mongo_db['courses_ndb_test_cache'].update_one({'uid': self.uid}, {'$set': {'uid': self.uid, 'results': results}}, upsert=True)
        results_id = {self.get_attribute_value(row, 'id'): [] for row in results}
        return results_id