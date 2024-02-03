from typing import Dict, List
from app.core.database import Database

class ScheduleDatabase(Database):
    def __init__(self, uid, database_id, notion_key) -> None:
        select_schema: Dict[str, List] = {
            'id': self.__get_attr__(None, 'id'),
            'name': self.__get_attr__('Name', 'title'),
            'detail': self.__get_attr__('Detail', 'url'),
            'start': self.__get_attr__('Date', 'date_start'),
            'end': self.__get_attr__('Date', 'date_end'),
            'progress': self.__get_attr__('Progress', 'select'),
            'display': self.__get_attr__('Display', 'checkbox'),
            'created_time': self.__get_attr__(None, 'created_time'),
            'last_edited_time': self.__get_attr__(None, 'last_edited_time')
        }
        insert_schema: Dict[str, List] = {
            'name': ('Name', 'title'),
            'start': ('Date', 'date_start'),
            'detail': ('Detail', 'url'),
            'end': ('Date', 'date_start'),
            'progress': ('Progress', 'select'),
            'display': ('Display', 'checkbox'),
        }
        super().__init__(uid, database_id, notion_key, select_schema, insert_schema)

    def get_all_tasks(self) -> List[Dict]:
        query_params = {
            'filter': {
                'property': 'Display', 'checkbox': { 'equals': True },
            },
            'sorts': [{'property': 'Date', 'direction': 'ascending'}]
        }
        results = self.query(**query_params)
        output = [
            {
                'name': self.get_attribute_value(task, 'name'),
                'detail': self.get_attribute_value(task, 'detail'),
                'start': self.get_attribute_value(task, 'start'),
                'end': self.get_attribute_value(task, 'end'),
                'progress': self.get_attribute_value(task, 'progress'),
                'display': self.get_attribute_value(task, 'display'),
            } 
            for task in results]
        return output

    def update_progress(self):
        # TODO: store the latest schedule in mongodb and use linkages of tasks to update the progress
        # fetch latest schedule from mongodb for fast retrieval
        query_params = {}
        latest_scheduled_tasks = self.query(**query_params)
        self.mongo_db['schedule_ndb_cache'].update_one({'uid': self.uid}, {'$set': {'uid': self.uid, 'results': latest_scheduled_tasks}}, upsert=True)
        # TODO: update progress in the task page_id
        # for task in latest_scheduled_tasks:
        #     if(self.get_attribute_value(task, 'Progress') == '100%' and self.get_attribute_value(task, 'task_details')):
        #         task_page_id = self.get_attribute_value(task, 'task_details')
        #         new_properties = {'To do': {'checkbox': False}} # don't define 'properties'
        #         self.update_page(task_page_id, new_properties)


    def remove_dict(self, lst, target_dict):
        if target_dict in lst:
            lst.remove(target_dict)
            return True
        else:
            return False

    def update_schedule_by_week_day(self, schedule):
        # TODO: to fix the parameter constructing
        old_tasks_rows = self.mongo_db['schedule_ndb_cache'].find_one({'uid': self.uid})['results']
        old_scheduled_tasks = [
            {
                'id': self.get_attribute_value(task, 'id'),
                'name': self.get_attribute_value(task, 'name'),
                'detail': self.get_attribute_value(task, 'detail'),
                'start': self.get_attribute_value(task, 'start'),
                'end': self.get_attribute_value(task, 'end'),
                'progress': self.get_attribute_value(task, 'progress'),
                'display': self.get_attribute_value(task, 'display'),
            }
            for task in old_tasks_rows
        ]
        tasks_to_update, remaining_tasks_to_delete, remaining_tasks_to_insert = self.__merge_tasks(old_scheduled_tasks, schedule)
        update_count = 0
        delete_count = 0
        insert_count = 0
        # Update tasks with new properties
        for old_task, new_task in tasks_to_update:
            update_count += 1
            self.update_task_in_notion(old_task, new_task)

        # Update tasks with new properties and reduce the number of tasks to insert
        min_len = min(len(remaining_tasks_to_delete), len(remaining_tasks_to_insert))
        for i in range(min_len):
            update_count += 1
            self.update_task_in_notion(remaining_tasks_to_delete[i], remaining_tasks_to_insert[i])

        # Delete any remaining tasks after updating tasks with new properties
        for delete_task in remaining_tasks_to_delete[min_len:]:
            delete_count += 1
            self.delete_page(delete_task['id'])

        # Insert any remaining new tasks after updating tasks with new properties
        for new_task in remaining_tasks_to_insert[min_len:]:
            insert_count += 1
            new_properties = self.set_attribute_value(new_task)
            page_object = self.create_page(new_properties)
            # {'object': 'page', 'id': 'f6a1cdf6-8970-43df-8248-090a5d6ab430', 'created_time': '2024-01-12T15:34:00.000Z', 'last_edited_time': '2024-01-12T15:34:00.000Z', 'created_by': {'object': 'user', 'id': 'e8dcc1f5-ca42-4e06-a49d-e696445d0c40'}, 'last_edited_by': {'object': 'user', 'id': 'e8dcc1f5-ca42-4e06-a49d-e696445d0c40'}, 'cover': None, 'icon': None, 'parent': {'type': 'database_id', 'database_id': '335a2dda-1c7a-48f6-b21d-82e93e83b9ce'}, 'archived': False, 'properties': {'Detail': {'id': 'L%3BnU', 'type': 'url', 'url': None}, 'Progress': {'id': 'V%3DL%3D', 'type': 'select', 'select': {'id': '37ed79a8-9034-434f-8635-eb54085f2c4c', 'name': '0%', 'color': 'default'}}, 'Date': {'id': 'bNBk', 'type': 'date', 'date': {'start': '2024-01-11T23:50:00.000+08:00', 'end': '2024-01-11T23:55:00.000+08:00', 'time_zone': None}}, 'Display': {'id': 'dtHM', 'type': 'checkbox', 'checkbox': True}, 'Name': {'id': 'title', 'type': 'title', 'title': [{'type': 'text', 'text': {'content': 'Sleep', 'link': None}, 'annotations': {'bold': False, 'italic': False, 'strikethrough': False, 'underline': False, 'code': False, 'color': 'default'}, 'plain_text': 'Sleep', 'href': None}]}}, 'url': 'https://www.notion.so/Sleep-f6a1cdf6897043df8248090a5d6ab430', 'public_url': None, 'request_id': 'ae47fac2-7aa3-419a-bbf2-d11c456b09b0'}


    def __find_task_in_list(self, task_list, task):
        for t in task_list:
            if t['name'] == task['name'] and t['start'] == task['start'] and t['end'] == task['end']:
                return t
        return None

    def __merge_tasks(self, old_tasks, new_tasks):
        tasks_to_update = []
        tasks_to_delete = old_tasks.copy()
        tasks_to_insert = []
        for new_task in new_tasks:
            old_task = self.__find_task_in_list(tasks_to_delete, new_task)
            if old_task:
                tasks_to_update.append((old_task, new_task))
                tasks_to_delete.remove(old_task)
            else:
                tasks_to_insert.append(new_task)

        return tasks_to_update, tasks_to_delete, tasks_to_insert

    def update_task_in_notion(self, old_task, new_task):
        page_id = old_task['id']
        updates = {}
        # Check for differences between old and new tasks and add them to the updates dictionary
        for key in old_task.keys():
            if key != 'id' and old_task[key] != new_task[key]:
                updates[key] = new_task[key]
        
        # If there are no updates, return early
        if not updates:
            return
        # Convert the updates to a format suitable for Notion API
        notion_updates = self.set_attribute_value(updates)
        # Perform the update
        self.update_page(page_id, notion_updates)



