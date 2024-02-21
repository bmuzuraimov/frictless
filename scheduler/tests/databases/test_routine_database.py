# from typing import Dict, List
# import json
# import os
# from app.core.database import Database
# from datetime import datetime

# class RoutineDatabase(Database):
#     def __init__(self, uid, database_id: str, notion_key: str) -> None:
#         select_schema: Dict[str, List] = {
#             'id': self.__get_attr__(None, 'id'),
#             'name': self.__get_attr__('Name', 'title'),
#             'detail': self.__get_attr__(None, 'page_url'),
#             'start': self.__get_attr__('Start', 'rich_text'),
#             'end': self.__get_attr__('End', 'rich_text'),
#             'is_fixed': self.__get_attr__('Type', 'select'),
#             'filter': self.__get_attr__('Filter', 'select'),
#             'week_day': self.__get_attr__('Week day', 'select'),
#             'created_time': self.__get_attr__(None, 'created_time'),
#             'last_edited_time': self.__get_attr__(None, 'last_edited_time')
#         }
#         insert_schema: Dict[str, List] = {
#             'id': self.__set_attr__(None, 'id'),
#             'name': self.__set_attr__('Name', 'title'),
#             'start': self.__set_attr__('Start', 'rich_text'),
#             'end': self.__set_attr__('End', 'rich_text'),
#             'is_fixed': self.__set_attr__('Type', 'select'),
#             'filter': self.__set_attr__('Filter', 'select'),
#             'week_day': self.__set_attr__('Week day', 'select'),
#             'created_time': self.__set_attr__(None, 'created_time'),
#             'last_edited_time': self.__set_attr__(None, 'last_edited_time')
#         }
#         super().__init__(uid, database_id, notion_key, select_schema, insert_schema)

#     def get_week_day_routine(self, date: str) -> List[Dict]:
#         # TODO: fix sorting query
#         output: List[Dict] = []
#         if(os.environ.get('STAGE') == 'dev'):
#             results = self.mongo_db['routine_ndb_test_cache'].find_one({'uid': self.uid})['results']
#         else:
#             query_params = {
#                 'filter': {
#                     'and': [
#                         {
#                             'property': 'Filter',
#                             'select': {
#                                 'equals': 'Include',
#                             },
#                         },
#                         {
#                             'property': 'Week day',
#                             'select': {
#                                 'equals': date.strftime('%A'),
#                             },
#                         },
#                     ],
#                 },
#                 'sorts': [
#                     {
#                         'property': 'Start',
#                         'direction': 'ascending',
#                         'timestamp': 'start',
#                         'type': 'string',
#                     }
#                 ],
#             }
#             results = self.query(**query_params)
#             # self.mongo_db['routine_ndb_test_cache'].update_one({'uid': self.uid}, {'$set': {'uid': self.uid, 'results': results}}, upsert=True)
#         for task in results:
#             start_time_str = self.get_attribute_value(task, 'start')
#             end_time_str = self.get_attribute_value(task, 'end')
#             start_datetime = datetime.combine(
#                 date,
#                 datetime.strptime(start_time_str, '%H:%M').time()
#             )
#             end_datetime = datetime.combine(
#                 date,
#                 datetime.strptime(end_time_str, '%H:%M').time()
#             )
#             output.append({
#                 'id': self.get_attribute_value(task, 'id'),
#                 'name': self.get_attribute_value(task, 'name'),
#                 'detail': None,
#                 'start': start_datetime,
#                 'end': end_datetime,
#                 'progress': '0%',
#                 'display': True,
#                 'task_details': [],
#                 'is_fixed': self.get_attribute_value(task, 'is_fixed') == 'Fixed',
#             })
#         output.sort(key=lambda x: x['start'])
#         return output