from typing import Dict, List
import os
import io
import PyPDF2
import requests
from app.core.database import Database

class LectureNotesDatabase(Database):
    def __init__(self, uid, database_id: str, notion_key: str):
        select_schema: Dict[str, List] = {
            'id': self.__get_attr__(None, 'id'),
            'name': self.__get_attr__('Name', 'title'),
            'detail': self.__get_attr__(None, 'page_url'),
            'to_do': self.__get_attr__('To do', 'checkbox'),
            'course': self.__get_attr__('Course', 'relation'),
            'duration': self.__get_attr__('Duration', 'number'),
            'file_url': self.__get_attr__('Document', 'url'),
            'min_page': self.__get_attr__('Min. per page', 'number'),
            'week_no': self.__get_attr__('Week #', 'number'),
            'read_count': self.__get_attr__('Read times', 'number'),
            'created_time': self.__get_attr__(None, 'created_time'),
            'last_edited_time': self.__get_attr__(None, 'last_edited_time')
        }
        insert_schema: Dict[str, List] = {
            'id': self.__set_attr__(None, 'id'),
            'name': self.__set_attr__('Name', 'title'),
            'to_do': self.__set_attr__('To do', 'checkbox'),
            'course': self.__set_attr__('Course', 'relation'),
            'duration': self.__set_attr__('Duration', 'number'),
            'min_page': self.__set_attr__('Min. per page', 'number'),
            'week_no': self.__set_attr__('Week #', 'number'),
            'read_count': self.__set_attr__('Read times', 'number'),
            'created_time': self.__set_attr__(None, 'created_time'),
            'last_edited_time': self.__set_attr__(None, 'last_edited_time')
        }
        super().__init__(uid, database_id, notion_key, select_schema, insert_schema)

    def evaluate_tasks(self, file_url: str, min_page: int) -> int:
        min_page = min_page if min_page else 1.2
        try:
            response = requests.get(file_url)
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(response.content))
            num_pages = len(pdf_reader.pages)
            duration = int(num_pages) * float(min_page)
            duration = round(duration)
            if duration % 5 != 0: duration += (5 - duration % 5)
            return duration
        except(requests.exceptions.RequestException) as e:
            print(f"Error processing task {file_url}: {e}")
        except PyPDF2.errors.PdfReadError as e:
            print(f"Unsupported file type: {file_url}: {e}")
            return 50

    def update_task_duration(self, page_id: str, duration: int):
        """
        Updates the duration of a task in the tasks_by_subject database in Notion.

        Args:
            page_id (str): The ID of the task page in Notion.
            duration (float): The new duration of the task.

        Returns:
            None
        """
        query_params = {'Duration': { 'number': duration }}
        self.update_page(page_id, query_params)

    def get_lecture_notes(self):
        output: Dict[str, List] = {}
        if(os.environ.get('STAGE') == 'dev'):
            results = self.mongo_db['lecture_notes_ndb_test_cache'].find_one({'uid': self.uid})['results']
        else:
            query_params = {
                'filter': {
                    'property': 'To do',
                    'checkbox': {
                        'equals': True
                    }
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
            # self.mongo_db['lecture_notes_ndb_test_cache'].update_one({'uid': self.uid}, {'$set': {'uid': self.uid, 'results': results}}, upsert=True)
        for task in results:
            id = self.get_attribute_value(task, 'id')
            min_per_page = self.get_attribute_value(task, 'min_page')
            course = self.get_attribute_value(task, 'course')
            duration = self.get_attribute_value(task, 'duration')
            file_url = self.get_attribute_value(task, 'file_url')
            if course not in output:
                output[course] = []
            if duration is None:
                duration = self.evaluate_tasks(file_url, min_per_page) if(file_url) else 40
                self.update_task_duration(id, duration)
            output[course].append({
                'id': id,
                'name': self.get_attribute_value(task, 'name'),
                'detail': self.get_attribute_value(task, 'detail'),
                'start': None,
                'end': None,
                'duration': duration,
                'progress': '0%',
                'display': True,
                'task_details': course,
                'is_fixed': False,
            })
        return output