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

def chat_pdf_history(pdf_docs_path):
    chat_history =[
        HumanMessage(content="""Hello I Need Help to answer some qquestion from the given pdfs please help"""),
        AIMessage(content = "Yes I am Ready for the job I will skillfully read give accurate results")
     ] 
    
    text = ""
    for path in pdf_docs_path:      
       loader = PyPDFLoader(pdf_docs_path)
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
    "chat_history":chat_history,
    "input": "what is amount in rupees"
    })
    print(response['answer'])

    

# def get_pdf_text(pdf_docs_path):
#     loader = PyPDFLoader(pdf_docs_path)
#     pages = loader.load_and_split()
#     text = ""
#     for page in pages:
#          text += page.page_content
#     return text



# def get_text_chunks(text):
#     text_splitter = CharacterTextSplitter(
#         separator="\n",
#         chunk_size=1000,
#         chunk_overlap=200,
#         length_function=len
#     )
#     chunks = text_splitter.split_text(text)
#     return chunks


# def get_vectorstore(text_chunks):
#     embeddings = OpenAIEmbeddings(api_key=openaikey)
#     # embeddings = HuggingFaceInstructEmbeddings(model_name="hkunlp/instructor-xl")
#     vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
#     return vectorstore

# def get_conversational_chain(vectorstore):
#     llm = ChatOpenAI(temperature=0.9,api_key=openaikey)
#     template = """Answer the question based only on the following context:
#     {context}   

#     Question: {question}
#     """
#     prompt = ChatPromptTemplate.from_template(template)
#     chain = (
#     {"context": vectorstore.as_retriever(), "question": RunnablePassthrough()}
#     | prompt
#     | llm
#     | StrOutputParser()
#     )
#     return chain
    
    
# def get_context_retriever_chain(vectorstore):
#     llm = ChatOpenAI(api_key=openaikey)
    
#     retriever = vectorstore.as_retriever()
    
#     prompt = ChatPromptTemplate.from_messages([
#       MessagesPlaceholder(variable_name="chat_history"),
#       ("user", "{input}"),
#       ("user", "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation")
#     ])
    
#     retriever_chain = create_history_aware_retriever(llm, retriever, prompt)
    
#     return retriever_chain    


# def get_conversational_rag_chain(retriever_chain): 
    
#     llm = ChatOpenAI(api_key=openaikey)
    
#     prompt = ChatPromptTemplate.from_messages([
#       ("system", "Answer the user's questions based on the below context:\n\n{context}"),
#       MessagesPlaceholder(variable_name="chat_history"),
#       ("user", "{input}"),      
#     ])
    
#     stuff_documents_chain = create_stuff_documents_chain(llm,prompt)
    
#     return create_retrieval_chain(retriever_chain, stuff_documents_chain)


    
def main():
    chat_pdf_history(["test0.pdf","test1.pdf"])
    # chat_history =[
    #     HumanMessage(content="""Hello I Need Help to answer some qquestion from the given pdfs please help"""
    #               )
    #     AIMessage(content = "Yes I am Ready for the job I will skillfully read give accurate results")
    # ] 
    # raw_text = get_pdf_text("monu.pdf")
    # text_chunks = get_text_chunks(raw_text)
    # vector_store = get_vectorstore(text_chunks) 
    # # conversation_chain = get_conversational_chain(vector_store)   
    # # response  = conversation_chain.invoke("List out the marketing strategies of Blackberry.")
    # # print (response)
    # conversational_chain = get_context_retriever_chain(vector_store)
    # rag_chain = get_conversational_rag_chain(conversational_chain)
    # response = rag_chain.invoke({
    # "chat_history":chat_history,
    # "input": "List out some more"
    # })
    # print(response['answer'])
    


if __name__ == '__main__':
    
    main()    