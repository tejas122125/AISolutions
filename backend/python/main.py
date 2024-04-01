from flask import Flask, jsonify,request,session
import re
import requests
from flask_cors import CORS, cross_origin
# # from backend.python.chatwithpdf import chat_pdf_history
# from backend.python.chatwithpdf import chat_pdf_history
# from backend.python.functions import download_pdf


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


load_dotenv()
openaikey = os.environ.get("OPENAI_API_KEY")
# print("fbvjhvb"+openaikey)

embeddings = OpenAIEmbeddings(model="text-embedding-3-large",api_key=openaikey)

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
    
    
    embeddings = OpenAIEmbeddings(api_key=openaikey)
    # embeddings = HuggingFaceInstructEmbeddings(model_name="hkunlp/instructor-xl")
    vectorstore = FAISS.from_texts(texts=chunks, embedding=embeddings) 
    
    llm = ChatOpenAI(temperature=0.9,api_key=openaikey)
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
    llm = ChatOpenAI(api_key=openaikey)
    
    retriever = vectorstore.as_retriever()
    
    prompt = ChatPromptTemplate.from_messages([
      MessagesPlaceholder(variable_name="chat_history"),
      ("user", "{input}"),
      ("user", "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation")
    ])
    
    retriever_chain = create_history_aware_retriever(llm, retriever, prompt)
        
    llm = ChatOpenAI(api_key=openaikey)
    
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
    
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Open the file in binary write mode and write the response content (PDF data) to it
        with open(filename, 'wb') as file:
            file.write(response.content)
        print(f"PDF downloaded successfully and saved as '{filename}'")
    else:
        print(f"Failed to download PDF. Status code: {response.status_code}")


app = Flask(__name__)
app.secret_key = 'tejas'
CORS(app)

def extract_string_between(source_string, start_string, end_string):
    pattern = re.compile(f'{re.escape(start_string)}(.*?){re.escape(end_string)}')
    match = pattern.search(source_string)
    if match:
        return match.group(1)
    else:
        return None

@app.route('/chatpdffiles', methods=['POST'])
def getChat():
    # if 'chathistory' not in session:
    #     session['chathistory'] =  [
    #     HumanMessage(content="Hello I Need Help to answer some qquestion from the given pdfs please help"),
    #     AIMessage(content = "Yes I am Ready for the job I will skillfully read give accurate results")
    #       ] 
        
    # print(session['chathistory'])
    
    chathistory = [
        HumanMessage(content="Hello I Need Help to answer some qquestion from the given pdfs please help"),
        AIMessage(content = "Yes I am Ready for the job I will skillfully read give accurate results")
     ]
        
    filename = []
    question = request.json['question']
    length = request.json['length']
    
    
    # print(session('chathistory'))
    
    
    
    for i in range(length):
        filename.append(f'test{i}.pdf')
        
    file_path = 'chathistory.txt'  
    
    if os.path.exists(file_path):
        with open('chathistory.txt', 'r') as file:
            file_content = file.read()
            
            
        print(f"The file '{file_path}' exists.")
    else:
        print(f"The file '{file_path}' does not exist.")  
        
    # creating chat history  
  
    response = chat_pdf_history(filename,question,chathistory)
 
    print(response)
    chthist=f"start123  {chathistory}  end123"
    
    with open('chathistory.txt', 'w') as file:
    # Write the string to the file
        file.write(chthist)
    # session['chathistory'] = response['chat_history']

    return jsonify({"AI" : response['answer']})


@app.route('/uploadpdffiles', methods=['POST'])
def getlink():
    links = request.json
    for i in range(len(links)):
        filename = f"test{i}.pdf"
        link = links[i]
        download_pdf(link,filename)
       
    return jsonify({"download" : "successfull"})

if __name__ == '__main__':
    app.run(debug=True,port=5000)
