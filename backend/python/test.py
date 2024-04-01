from pymongo import MongoClient



def connect_to_mongodb (connectionstring = "mongodb+srv://tejasweekumarsingh:vex2l2htbIlbnGjD@tejas.tokgflw.mongodb.net/"):
    client = MongoClient(connectionstring)
    return client


def create_chathistory (client,database = "testdatabase",collection='userchats',email='tejaswee@gmail.com',userchat='',airesponse=''):
    db = client[database]
    collection = db[collection]
    document = collection.find_one({'email': email})

    if document:
        # Update the array in the document
        
        updated_userquestion = document.get('userquestion', []) + [userchat]
        updated_airesponse = document.get('airesponse', []) + [airesponse]
        
    
        # Update the document in the collection
        collection.update_one({'email': email}, {'$set': {'userquestion': updated_userquestion ,'airesponse': updated_airesponse}})
        print('Document updated successfully')
    else:
        print('Document not found for email:', email)
        document = {'email':email, 'userquestion': [userchat],"airesponse":[airesponse]}
        collection.insert_one(document)
        
        print("created a new document")

def get_chathistory(client,database="testdatabase",collection='userchats',email="tejaswee@gmail.com"):
    userquestion = []
    airesponse = []
    # Access a database
    db = client[database]

# Access a collection
    collection = db[collection]
    filter = {'email': 'tejaswee@gmail.com'}

# Retrieve the document
    document = collection.find_one(filter)

# Print the document
    if document:
        userquestion = document.get('userquestion')
        airesponse = document.get('airesponse')
        return userquestion,airesponse
        
    else:
        return "fgfgf",""
        print('Document not found')

def main ():
    client  = connect_to_mongodb()
    # create_chathistory(client,userchat="monujinda dffrgrgbad",airesponse="haiahaiah")
    userquestion,airesponse = get_chathistory(client=client)
    print(userquestion,airesponse)

# if __name__ == '__main__':
#     main()    





main()