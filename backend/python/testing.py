# from  functions import download_csv,helpcsv,chatcsv
import os
from dotenv import load_dotenv
from langchain_community.llms import HuggingFaceEndpoint

from langchain.agents.agent_types import AgentType
from langchain_experimental.agents.agent_toolkits import create_csv_agent
from langchain_openai import ChatOpenAI, OpenAI
# from langchain_experimental.tools import PythonREPLTool

# from langchain.agents.agent_types import AgentType
# from langchain_experimental.agents import create_pandas_dataframe_agent

# from langchain.agents import AgentExecutor, create_openai_tools_agent
# from langchain_experimental.tools import PythonREPLTool
# from langchain.agents import create_openai_functions_agent
# import pandas as pd
# from langchain_openai import OpenAI
# from langchain.prompts import PromptTemplate
# from langchain.chains import ConversationChain
# from langchain.memory import ConversationBufferWindowMemory
# from langchain_community.llms import HuggingFaceEndpoint


# from langchain_community.utilities.sql_database import SQLDatabase
# from langchain_community.agent_toolkits import create_sql_agent
# from langchain_core.output_parsers import StrOutputParser


load_dotenv()
huggingface = os.environ.get("HUGGINGFACEHUB_API_TOKEN")

repo_id = "mistralai/Mistral-7B-Instruct-v0.2"
openaikey = os.environ.get("OPENAI_API_KEY")

# llm = HuggingFaceEndpoint(
#     repo_id=repo_id,huggingfacehub_api_token=huggingface
# )

llm = ChatOpenAI(model="gpt-3.5-turbo-1106", temperature=0,api_key=openaikey)
# print(llm.invoke("what to call if someone is feeling low"))

# def chatcsv(question="what are the different trends summarize it carefully",filepath="./csv/data.csv"):
#     openaikey = os.environ.get("OPENAI_API_KEY")
#     # llm = ChatOpenAI(model="gpt-3.5-turbo-1106", temperature=0,api_key=openaikey)
#     pythontools = [PythonREPLTool()]
#     conversation_with_summary = ConversationChain(
#         llm=llm,    
#         memory=ConversationBufferWindowMemory(k=2),
#         verbose=True
#     )
#     query_prompt_template = PromptTemplate.from_template(
#     """you are skillfull csv reader using pandas and pythons tools. So answer the question {question} based on the csv file given.name of the csv file is {filepath}
#     if you need any further information to answer the question please ask 
#     """)
#     df = pd.read_csv(filepath)
#     agent_pandas = create_pandas_dataframe_agent(
#         llm=llm,
#         df=df,
#         verbose=True,
#         agent_type=AgentType.OPENAI_FUNCTIONS,
    
#     )
#     agent = query_prompt_template  | agent_pandas 
#     response = agent.invoke({"question":question,"filepath":filepath})
#     print (response["output"])
#     res = response["output"]
#     return  res


# # chatcsv()    






agent = create_csv_agent(
    llm,
    "./csv/data.csv",
    verbose=True,
    agent_type=AgentType.OPENAI_FUNCTIONS,
)

try :
    print(agent.invoke('what are the different trends in the data'))
except Exception as e:
    print("monu",e)    