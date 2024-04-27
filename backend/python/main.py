from flask import Flask, jsonify,request,session
import re
import requests
from flask_cors import CORS, cross_origin
# from backend.python.chatwithpdf import chat_pdf_history
# from backend.python.functions import download_pdf

from flask_session import Session
import os
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from operator import itemgetter
from langchain_community.document_loaders import PyPDFLoader
from dotenv import load_dotenv
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.chains import conversational_retrieval
from langchain_openai import OpenAIEmbeddings,ChatOpenAI
from langchain_community.document_loaders import PyPDFLoader
from langchain.chains import ConversationChain
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableLambda, RunnablePassthrough
from langchain_core.messages import AIMessage, HumanMessage, get_buffer_string
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.prompts.prompt import PromptTemplate
from langchain_community.llms import HuggingFaceEndpoint
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings

from mongo import connect_to_mongodb, create_chathistory, get_chathistory



load_dotenv()
huggingface = os.environ.get("HUGGINGFACEHUB_API_TOKEN")
# print("fbvjhvb"+openaikey)

# embeddings = OpenAIEmbeddings(model="text-embedding-3-large",api_key=openaikey)

embeddings = HuggingFaceInferenceAPIEmbeddings(
    api_key=huggingface, model_name="sentence-transformers/all-MiniLM-l6-v2"
)

repo_id = "mistralai/Mistral-7B-Instruct-v0.2"

llm = HuggingFaceEndpoint(
    repo_id=repo_id, max_length=128, temperature=0.5, token=huggingface
)

# chathistory =[
#         HumanMessage(content="Hello I Need Help to answer some qquestion from the given pdfs please help"),
#         AIMessage(content = "Yes I am Ready for the job I will skillfully read give accurate results")
#      ] 
print("fkufh")

def chat_pdf_history(pdf_docs_path,question,chathistory):

    
    
    
    text = ""
    for path in pdf_docs_path:      
       loader = PyPDFLoader(path)
       pages = loader.load_and_split()
       for page in pages:
           text += page.page_content
           
    text_splitter = CharacterTextSplitter(
    separator="\n",
    chunk_size=1000,
    chunk_overlap=200,
    length_function=len
    )
    chunks = text_splitter.split_text(text)
    
    
    # embeddings = OpenAIEmbeddings(api_key=openaikey)
    # embeddings = HuggingFaceInstructEmbeddings(model_name="hkunlp/instructor-xl")
    vectorstore = FAISS.from_texts(texts=chunks, embedding=embeddings) 
    
    # llm = ChatOpenAI(temperature=0.9,api_key=openaikey)
    template = """Answer the question based only on the following context:
    {context}   

    Question: {question}
    """
    prompt = ChatPromptTemplate.from_template(template)
    chain = (
    {"context": vectorstore.as_retriever(), "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
    )  
    # llm = ChatOpenAI(api_key=openaikey)
    
    retriever = vectorstore.as_retriever()
    
    prompt = ChatPromptTemplate.from_messages([
      MessagesPlaceholder(variable_name="chat_history"),
      ("user", "{input}"),
      ("user", "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation")
    ])
    
    retriever_chain = create_history_aware_retriever(llm, retriever, prompt)
        
    # llm = ChatOpenAI(api_key=openaikey)
    # get another apikey from open ai
    prompt = ChatPromptTemplate.from_messages([
      ("system", "Answer the user's questions based on the below context:\n\n{context}"),
      MessagesPlaceholder(variable_name="chat_history"),
      ("user", "{input}"),      
    ])
    
    stuff_documents_chain = create_stuff_documents_chain(llm,prompt) 
    rag_chain = create_retrieval_chain(retriever_chain, stuff_documents_chain)   
    response = rag_chain.invoke({
    "chat_history":chathistory,
    "input": question
    })
    print(response['answer'])
    return (response)


def download_pdf(url, filename):
    # Send a GET request to the URL
    response = requests.get(url)
    

    if response.status_code == 200:
        # Open the file in binary write mode and write the response content (PDF data) to it
        if not os.path.exists(filename):
            
            with open(filename, 'wb') as file:
                file.write(response.content)
            print(f"PDF downloaded successfully and saved as '{filename}'")
        else:
            print("NO need to download file it already exist")    
    else:
        print(f"Failed to download PDF. Status code: {response.status_code}")
        
app = Flask(__name__)

CORS(app)


@app.route('/chatpdffiles', methods=['POST'])
def getChat():
    chathistory = [
        HumanMessage(content="Hello I Need Help to answer some qquestion from the given pdfs please help"),
        AIMessage(content = "Yes I am Ready for the job I will skillfully read give accurate results")     ]
    client = app.config['client']
    userquestion,airesponse = get_chathistory(client=client)
    
    for i in range (len(userquestion)):
        chathistory.append(HumanMessage(content=f"{userquestion[i]}"))
        chathistory.append( AIMessage(content = f"{airesponse}") )
        

        
    filename = []
    question = request.json['question']
    length = request.json['length']
    fileid  = request.json['fileid']   
    

    
    
    for i in range(length):
        filename.append(f'{fileid}{i}.pdf')

 
    response = chat_pdf_history(filename,question,chathistory)
    print(response['answer'])
    
    create_chathistory(client,userchat=question,airesponse=response['answer'])
    
 
    print(response)
    
    return jsonify({"AI" : 'monububuibb'})


@app.route('/uploadpdffiles', methods=['POST'])
def getlink():
    links = request.json["downloadlink"]
    pdfids = request.json["pdfid"]

    for i in range(len(links)):
        filename = f"{pdfids}{i}.pdf"
        print(filename)
        link = links[i]
        print(link)
        download_pdf(link,filename)
  

 
    return jsonify({"download" : "successfull"})


# @app.before_first_request
# def initialize():
#     client  = connect_to_mongodb()
#     app.config['client'] = client
    
    

#  here we want to store vectore only once per session according to the current session optimization

if __name__ == '__main__':
    app.run(debug=True,port=5000)
