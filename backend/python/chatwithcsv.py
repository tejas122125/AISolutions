import os
from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.services.storage import Storage

from appwrite.id import ID

appwritekey = os.environ.get("APPWRITE_API_KEY")
client = Client()
client.set_endpoint('https://cloud.appwrite.io/v1')
client.set_project('660e8a4baeaf25149b31')
client.set_key(appwritekey)

storage = Storage(client)
databases = Databases(client)

testTodo1 = {
    'title': "Buy apples"
  }

# res = databases.create_document(
#     database_id='aisolution',
#     collection_id='testcollection',
#     document_id=ID.unique(),
#     data=testTodo1
#   )

res = storage.get_file(
    bucket_id="660e8aa1521417614a44",
    file_id="661d72c884fc3d119c93"
)
res = storage.create_file()
print(res)