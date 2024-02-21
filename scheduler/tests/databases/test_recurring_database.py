# from typing import Dict, List
# import os
# import json
# from app.core.database import Database
# from datetime import datetime

# class RecurringDatabase(Database):
#     def __init__(self, uid, database_id: str, notion_key: str):
#         select_schema: Dict[str, List] = {
#             'id': self.__get_attr__(None, 'id'),
#             'name': self.__get_attr__('Name', 'title'),
#             'detail': self.__get_attr__(None, 'page_url'),
#             'start': self.__get_attr__('Date', 'date_start'),
#             'end': self.__get_attr__('Date', 'date_end'),
#             'duration': self.__get_attr__('Duration', 'number'),
#             'week_days': self.__get_attr__('Week days', 'multi_select'),
#             'created_time': self.__get_attr__(None, 'created_time'),
#             'last_edited_time': self.__get_attr__(None, 'last_edited_time')
#         }
#         insert_schema: Dict[str, List] = {
#             'id': self.__set_attr__(None, 'id'),
#             'name': self.__set_attr__('Name', 'title'),
#             'start': self.__set_attr__('Date', 'date_start'),
#             'end': self.__set_attr__('Date', 'date_end'),
#             'duration': self.__set_attr__('Duration', 'number'),
#             'week_days': self.__set_attr__('Week days', 'multi_select'),
#             'created_time': self.__set_attr__(None, 'created_time'),
#             'last_edited_time': self.__set_attr__(None, 'last_edited_time')
#         }
#         super().__init__(uid, database_id, notion_key, select_schema, insert_schema)

#     def get_projects(self, date: datetime) -> List[Dict]:
#         output: List[Dict] = []
#         date_str = date.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
#         if(os.environ.get('STAGE') == 'dev'):
#             results = self.mongo_db['recurring_ndb_test_cache'].find_one({'uid': self.uid})['results']
#         else:
#             query_params = {
#                 'filter': {
#                     "and": [
#                         {
#                             'property': 'Duration',
#                             'number': {
#                                 'greater_than': 0
#                             }
#                         },
#                         {
#                             'property': 'Week days',
#                             'multi_select': {
#                                 'contains': date.strftime('%A')
#                             }
#                         }
#                     ]
#                 },
#                 'sorts': [
#                     {
#                         'property': 'Date',
#                         'direction': 'ascending',
#                     }
#                 ]
#             }

#             results = self.query(**query_params)
#             # self.mongo_db['recurring_ndb_test_cache'].update_one({'uid': self.uid}, {'$set': {'uid': self.uid, 'results': results}}, upsert=True)
#         for task in results:
#             start_date = self.get_attribute_value(task, 'start')
#             end_date = self.get_attribute_value(task, 'end')
#             # Check if start date is before date and end date is on or after date
#             if start_date <= date_str and (end_date is None or end_date >= date_str):
#                 new_task = {
#                     'id': self.get_attribute_value(task, 'id'),
#                     'name': self.get_attribute_value(task, 'name'),
#                     'detail': self.get_attribute_value(task, 'detail'),
#                     'duration': self.get_attribute_value(task, 'duration'),
#                     'start': None,
#                     'end': None,
#                     'progress': '0%',
#                     'display': True,
#                     'task_details': [],
#                     'is_fixed': False
#                 }
#                 output.append(new_task)
#         return output
