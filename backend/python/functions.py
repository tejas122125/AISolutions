import io
import requests
import secrets
from PIL import Image
import base64
from datetime import datetime,timedelta
from langchain.agents.agent_types import AgentType
from langchain_experimental.agents import create_pandas_dataframe_agent
from langchain_openai import ChatOpenAI
from langchain import hub
import os
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain_experimental.tools import PythonREPLTool
from langchain.agents import create_openai_functions_agent
import pandas as pd
from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferWindowMemory
from langchain_community.llms import HuggingFaceEndpoint


from langchain_community.utilities.sql_database import SQLDatabase
from langchain_community.agent_toolkits import create_sql_agent



def download_pdf(url, filename):
    # Send a GET request to the URL
    response = requests.get(url)
    
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Open the file in binary write mode and write the response content (PDF data) to it
        with open(filename, 'wb') as file:
            file.write(response.content)
        print(f"PDF downloaded successfully and saved as '{filename}'")
    else:
        print(f"Failed to download PDF. Status code: {response.status_code}")
        
        
def generate_new_token():
    api_token = secrets.token_hex(16) 
    return api_token
           
           
def get_current_date():
    today_date = datetime.now()

# Format the date as YYYY-MM-DD
    formatted_date = today_date.strftime('%d-%m-%Y')    
    return formatted_date        
    
    
    
def get_expiry_date(noofdays):
    current_datetime = datetime.now()
    # Create a timedelta object representing the amount of time to add
    delta = timedelta(days=noofdays)

    # Add the timedelta to the current datetime
    new_datetime = current_datetime + delta
    return new_datetime

def check_expiry(date):
    # Split the date and time components
    date_components = date.split()[0]
    
    # Split the date components to extract year, month, and day
    year, month, day = map(int, date_components.split('-'))
    print (year,month,day)
    date = datetime(year=year,month=month,day=day)  
    current_datetime = datetime.now()
    if current_datetime > date:
        return True
    else: 
        return False
      



def stringrun (code):
    try:
        code = code
        exec(code)
    except:
        print("execptiopn occured no worry")    
        
        
    # code = code
    # exec(code)
    # return True

def download_csv(fileurl = 'https://cloud.appwrite.io/v1/storage/buckets/658da6ec42519f39311a/files/65fdc0a5cd567a08f5ce/view?project=658c3e666ed66b56edb7&mode=admin',filepath ='csv/data.csv'):
        # Send a GET request to the URL to download the file
        response = requests.get(fileurl)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Open the local file in binary write mode and write the content of the response
             if not os.path.exists(filepath):
                with open(filepath, 'wb') as f:
                    f.write(response.content)
                print(f"CSV file downloaded successfully and saved as {filepath}")
             else:
                print("NO need to download file it already exist")    
                
        else:
            print(f"Failed to download CSV file. Status code: {response.status_code}")


# download_csv()
def encode_image_as_base64(image_path):
    with open(image_path, "rb") as img_file:
        encoded_string = base64.b64encode(img_file.read()).decode('utf-8')
    return encoded_string

def get_base_64(filepath):
    # Replace 'path/to/your/image.png' with the actual path to your PNG image fil
    with open(filepath, 'rb') as img_file:
        image_data = img_file.read()
    # Convert the image to a base64 string
    base64_image = encode_image_as_base64(filepath)
    return base64_image

# configuratrion for visualizing csv

from dotenv import load_dotenv
load_dotenv()




def helpcsv (question,filepath,imagename):
    openaikey = os.environ.get("OPENAI_API_KEY")
    llm = ChatOpenAI(model="gpt-3.5-turbo-1106", temperature=0,api_key=openaikey)
    pythontools = [PythonREPLTool()]
    conversation_with_summary = ConversationChain(
        llm=llm,    
        memory=ConversationBufferWindowMemory(k=2),
        verbose=True
    )

    prompt_visualize_csv = PromptTemplate.from_template(
        "you are skillfull csv reader using pandas and pythons tools. GENERATE the necessary python code for the query {question} donot write the string python at the starting assuming name of file is {name} and to save the figure of plot  use the filename as {image} and also give the output in python multiline string format  ."
    )


    df = pd.read_csv(filepath)
    agent_pandas = create_pandas_dataframe_agent(
        llm=llm,
        df=df,
        verbose=True,
        agent_type=AgentType.OPENAI_FUNCTIONS,
    
    )
    imagepath = f"csv/{imagename}"
    agent = prompt_visualize_csv  | agent_pandas 
    response = agent.invoke({"question":question,"name":filepath,"image":imagepath})
    # print (response["output"])
    res = response["output"]
    res =  res.replace("python", "")
    print(res)
    stringrun(res)
    img = f"{imagepath}.png"
    base_64 = get_base_64(img)
    return base_64
    
# visualizecsv(question="create a histogram plot of first column",filepath="csv/data.csv",imagename="sudeep")    
    
#QUERY ABOUT CSV

def chatcsv(question,filepath):
    openaikey = os.environ.get("OPENAI_API_KEY")
    llm = ChatOpenAI(model="gpt-3.5-turbo-1106", temperature=0,api_key=openaikey)
    pythontools = [PythonREPLTool()]
    conversation_with_summary = ConversationChain(
        llm=llm,    
        memory=ConversationBufferWindowMemory(k=2),
        verbose=True
    )
    query_prompt_template = PromptTemplate.from_template(
    """you are skillfull csv reader using pandas and pythons tools. So answer the question {question} based on the csv file given.name of the csv file is {filepath}
    if you need any further information to answer the question please ask 
    """)
    df = pd.read_csv(filepath)
    agent_pandas = create_pandas_dataframe_agent(
        llm=llm,
        df=df,
        verbose=True,
        agent_type=AgentType.OPENAI_FUNCTIONS,
    
    )
    agent = query_prompt_template  | agent_pandas 
    response = agent.invoke({"question":question,"filepath":filepath})
    print (response["output"])
    res = response["output"]
    return  res
    
def chatwithsql():
    
    db = SQLDatabase.from_uri("sqlite:///Chinook.db")
    schema = db.get_table_info()
    
    
    openaikey = os.environ.get("OPENAI_API_KEY")
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
    prompt_checking_write = PromptTemplate.from_template(
        "It is a very Serious Job you have to do.You are excellent Sql query checker .Now Check if {Question} is about to modify something in Sql Database or not . If it is going to modify then simply give response yes it is going to  modify Sql database and if not then simply give response no it is not going to modify anything in Sql database"
    )
    check_chain = prompt_checking_write | llm
    
    
    agent_executor = create_sql_agent(llm, db=db, agent_type="openai-tools", verbose=True)