import unittest
from unittest.mock import patch, MagicMock
from app.core.database import Database
from notion_client.errors import APIResponseError
from datetime import datetime

class TestDatabase(unittest.TestCase):
    def setUp(self):
        self.uid = "test_uid"
        self.database_id = "test_database_id"
        self.notion_key = "test_notion_key"
        self.select_schema = {"test_column": ["properties", "Test", "title"]}
        self.insert_schema = {"test_column": ["Test", "title"]}
        self.db = Database(self.uid, self.database_id, self.notion_key, self.select_schema, self.insert_schema)

    @patch('app.core.database.Client')
    def test_client_initialization(self, mock_client):
        self.db._client = None
        self.assertIsNotNone(self.db.client)
        mock_client.assert_called_with(auth=self.notion_key)

    @patch('app.core.database.Client')
    def test_database_property(self, mock_client):
        mock_client.return_value.databases.retrieve.return_value = {"id": self.database_id}
        self.assertEqual(self.db.database, {"id": self.database_id})

    @patch('app.core.database.Client')
    def test_database_retrieval_error(self, mock_client):
        mock_client.return_value.databases.retrieve.side_effect = APIResponseError("Error")
        self.assertIsNone(self.db.database)

    @patch('app.core.database.Client')
    def test_query(self, mock_client):
        mock_client.return_value.databases.query.return_value = {'results': ['result1', 'result2']}
        self.assertEqual(self.db.query(), ['result1', 'result2'])

    @patch('app.core.database.Client')
    def test_query_error(self, mock_client):
        mock_client.return_value.databases.query.side_effect = APIResponseError("Error")
        self.assertEqual(self.db.query(), [])

    def test_get_attribute_value(self):
        test_row = {"properties": {"Test": {"title": [{"text": {"content": "test_value"}}]}}}
        self.assertEqual(self.db.get_attribute_value(test_row, "test_column"), "test_value")

    def test_set_attribute_value(self):
        test_row = {"test_column": "test_value"}
        expected_output = {"Test": {"title": [{"text": {"content": "test_value"}}]}}
        self.assertEqual(self.db.set_attribute_value(test_row), expected_output)

    @patch('app.core.database.Client')
    def test_create_page(self, mock_client):
        mock_client.return_value.pages.create.return_value = {"id": "new_page_id"}
        self.assertEqual(self.db.create_page({"Test": "value"}), {"id": "new_page_id"})

    @patch('app.core.database.Client')
    def test_create_page_error(self, mock_client):
        mock_client.return_value.pages.create.side_effect = APIResponseError("Error")
        with self.assertRaises(APIResponseError):
            self.db.create_page({"Test": "value"})

    @patch('app.core.database.Client')
    def test_get_page(self, mock_client):
        mock_client.return_value.pages.retrieve.return_value = {"id": "page_id"}
        self.assertEqual(self.db.get_page("page_id"), {"id": "page_id"})

    @patch('app.core.database.Client')
    def test_get_page_error(self, mock_client):
        mock_client.return_value.pages.retrieve.side_effect = APIResponseError("Error")
        with self.assertRaises(APIResponseError):
            self.db.get_page("page_id")

    @patch('app.core.database.Client')
    def test_update_page(self, mock_client):
        mock_client.return_value.pages.update.return_value = None
        self.assertIsNone(self.db.update_page("page_id", {"Test": "value"}))

    @patch('app.core.database.Client')
    def test_update_page_error(self, mock_client):
        mock_client.return_value.pages.update.side_effect = APIResponseError("Error")
        with self.assertRaises(APIResponseError):
            self.db.update_page("page_id", {"Test": "value"})

    @patch('app.core.database.Client')
    def test_delete_page(self, mock_client):
        mock_client.return_value.pages.update.return_value = None
        self.assertIsNone(self.db.delete_page("page_id"))

    @patch('app.core.database.Client')
    def test_delete_page_error(self, mock_client):
        mock_client.return_value.pages.update.side_effect = APIResponseError("Error")
        with self.assertRaises(APIResponseError):
            self.db.delete_page("page_id")

if __name__ == '__main__':
    unittest.main()
