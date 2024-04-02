from pymongo import MongoClient

from datetime import datetime,timedelta


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
        

    
    
def set_token(client,database = "testdatabase",token = "monu", expiry_date="never",limit=300):
    db = client[database]
    collection = db["tokens"]
    data = {"token":token,
            "expirydate":expiry_date,
            "limit":limit,
            "chatwithpdf":[],
            "chatwithwebsite":[]
            }
    # adding more categories 
    collection.insert_one(data)
    
def update_request_count (client,database="testdatabase",token = "monu"):
    #parsing current date and updatinf=g count
    date = datetime.now
    date = date.split()[0]
    year, month, day = map(int, date.split('-')) 
    date = f"{year} {month} {day}"
    print (date)
    
    db = client[database]
    collection = db["tokens"]
    filter = {"token":token}
    document = collection.find_one(filter)
    res = document.get('chatwithpdf', []) 
    if len(res) == 0:
        new_data = {
         "date":date,
         "request":1
        }
        collection.insert_one(new_data)
        print("newdata")
    else:    
        for i in range (len(res)):
                if res[i]["date"] == date:
                    res[i]["req"]+=1
        collection.insert_one(res)            
        print(res + "updated")
    
    
    
            

def main ():
    client  = connect_to_mongodb()
    apis(client=client)
    # create_chathistory(client,userchat="monujinda dffrgrgbad",airesponse="haiahaiah")
    # userquestion,airesponse = get_chathistory(client=client)
    # print(userquestion,airesponse)

# if __name__ == '__main__':
#     main()    





main()