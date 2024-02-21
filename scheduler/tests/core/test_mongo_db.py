# import unittest
# from unittest.mock import patch, MagicMock
# from app.core.mongo_db import MongoSingleton
# import os

# class TestMongoSingleton(unittest.TestCase):

#     @patch('app.core.mongo_db.MongoClient')
#     def test_singleton_instance(self, mock_mongo_client):
#         # Ensure that the MongoClient is called only once
#         instance1 = MongoSingleton()
#         instance2 = MongoSingleton()
#         self.assertIs(instance1, instance2)
#         mock_mongo_client.assert_called_once()

#     @patch.dict(os.environ, {
#         'MONGODB_USERNAME': 'testuser',
#         'MONGODB_PASSWORD': 'testpass',
#         'MONGODB_DBNAME': 'testdb',
#         'MONGODB_CLUSTERNAME': 'testcluster'
#     })
#     @patch('app.core.mongo_db.MongoClient')
#     def test_mongo_connection_string(self, mock_mongo_client):
#         # Test the construction of the MongoDB connection string
#         _ = MongoSingleton()
#         expected_conn_str = 'mongodb+srv://testuser:testpass@testcluster.mongodb.net/testdb?retryWrites=true&w=majority'
#         mock_mongo_client.assert_called_with(expected_conn_str)

#     @patch('app.core.mongo_db.MongoClient')
#     def test_get_client(self, mock_mongo_client):
#         # Test get_client method
#         client = MongoSingleton().get_client()
#         self.assertEqual(client, mock_mongo_client.return_value)

#     @patch('app.core.mongo_db.MongoClient')
#     def test_get_db(self, mock_mongo_client):
#         # Test get_db method
#         db = MongoSingleton().get_db()
#         self.assertEqual(db, mock_mongo_client.return_value[os.getenv('MONGODB_DBNAME')])

# if __name__ == '__main__':
#     unittest.main()
