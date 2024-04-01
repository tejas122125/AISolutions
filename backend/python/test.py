from pymongo import MongoClient



def connect_to_mongodb (connectionstring = "mongodb+srv://tejasweekumarsingh:vex2l2htbIlbnGjD@tejas.tokgflw.mongodb.net/"):
    client = MongoClient(connectionstring)
    return client


def create_chathistory (client,email='tejaswee@gmail.com',userchat='',airesponse=''):
    db = client['testdatabase']
    # Access a collection
    collection = db['userchats']
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

def 

def main ():
    client  = connect_to_mongodb()
    create_chathistory(client,userchat="monujinda bad")

# if __name__ == '__main__':
#     main()    





main()