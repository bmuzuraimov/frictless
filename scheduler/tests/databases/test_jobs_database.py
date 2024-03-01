import unittest
from app.notion_dbs.jobs_database import JobsDatabase

class TestJobsDatabase(unittest.TestCase):
    def test_sum(self):
        priority_db = JobsDatabase("65c3323a0b257baa2e14a3df", "80fa58ba-a250-4169-882e-8f169691b0b5", "secret_OzVkNiwCKHY0M3uMeC3tosi1pfFUjTcvGnoJ7WmJ9VJ")
        sample_answer = [{'id': '1c419016-3af5-4fec-9468-36e62efeca0a', 'name': 'To do', 'priority': 100}, {'id': 'aa01e740-b997-44f6-8f37-6df45e3de6ab', 'name': 'Jobs', 'priority': 80}, {'id': 'f7819c43-82dd-469d-b774-f055daa2bad7', 'name': 'Lecture notes', 'priority': 60}, {'id': 'a916e171-6e49-4041-89b3-50b6df930639', 'name': 'Recurring activities', 'priority': 40}, {'id': '77f1f220-8f09-48b0-9865-ea1ed1da43a6', 'name': 'Personal projects', 'priority': 20}, {'id': 'd77b4690-7896-4b17-beb6-65d5e934d0b0', 'name': 'Sports', 'priority': 10}]
        self.assertEqual(priority_db.get_priorities(), sample_answer, 'The priority is wrong')

if __name__ == '__main__':
    unittest.main()