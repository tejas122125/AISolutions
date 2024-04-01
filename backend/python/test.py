from pymongo import MongoClient



def connect_to_mongodb (connectionstring = "mongodb+srv://tejasweekumarsingh:vex2l2htbIlbnGjD@tejas.tokgflw.mongodb.net/"):
    client = MongoClient('mongodb://localhost:27017/')
    return client


def create_chathistory (client,email='tejaswee@gmail.com',userchat='',airesponse=''):
    db = client['testdatabase']
    # Access a collection
    collection = db['userchats']
    document = collection.find_one({'email': email})

    if document:
        # Update the array in the document
        new_elements = [userchat]
        updated_array = document.get('userquestion', []) + new_elements
    
        # Update the document in the collection
        collection.update_one({'email': email}, {'$set': {'strings': updated_array}})
        print('Document updated successfully')
    else:
        print('Document not found for email:', email)

# Insert a document with email and array of strings
    document = {'email': 'example@example.com', 'userquestion': ['string1', 'string2', 'string3']}
    collection.insert_one(document)
    