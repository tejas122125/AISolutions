# import os
# from appwrite.client import Client
# from appwrite.services.databases import Databases
# from appwrite.services.storage import Storage

# from appwrite.id import ID

# appwritekey = os.environ.get("APPWRITE_API_KEY")
# client = Client()
# client.set_endpoint('https://cloud.appwrite.io/v1')
# client.set_project('660e8a4baeaf25149b31')
# client.set_key(appwritekey)

# storage = Storage(client)
# databases = Databases(client)

# testTodo1 = {
#     'title': "Buy apples"
#   }

# # res = databases.create_document(
# #     database_id='aisolution',
# #     collection_id='testcollection',
# #     document_id=ID.unique(),
# #     data=testTodo1
# #   )

# # res = storage.get_file(
# #     bucket_id="660e8aa1521417614a44",
# #     file_id="661d72c884fc3d119c93"
# # )
# file = get_file("csv/player.png")
# res = storage.create_file(bucket_id="",file_id=ID.unique(),file=file)
# print(res)


from flask import Flask, jsonify,request,session
from  functions import download_csv,helpcsv

app = Flask(__name__)


@app.route('/visualizecsv', methods=['POST'])
def visualizecsv ():
    question = request.json['question']
    fileid  = request.json['fileid']   
    link =request.json['downloadlink']
    filepath = f'csv/{fileid}.csv'
    download_csv(fileurl=link,filepath=filepath)
    base_64 = helpcsv(question=question,filepath=filepath,imagename=fileid)
    return jsonify({"imagesrc": base_64})
    
    

