import { MongoClient } from 'mongodb';


export const uploadChatWithPdf =  async (token:string,msgid:string,msgname:string,fileids:string[])=> {
    // const uri = import.meta.env.VITE_APP_MONGOSTRING;
    
    const client = new MongoClient("mongodb+srv://tejasweekumarsingh:vex2l2htbIlbnGjD@tejas.tokgflw.mongodb.net/");
    try {
        await client.connect(); // Connect to MongoDB

        const database = client.db('testdatabse'); 
        const collection = database.collection('chatwithpdf'); 

        // Document to be uploaded
        const document = {
            token: token,
            messageid:msgid,
            messagename:msgname,
            fileids:fileids,
            human:[],
            ai:[]
        };
        const result = await collection.insertOne(document);
        return result.insertedId
        console.log(`Document inserted with ID: ${result.insertedId}`);
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await client.close(); // Close the MongoDB connection
    }
}


 export const getChatWithPdfMessages = async (token:string,messageid:string) => {

    // const uri = import.meta.env.VITE_APP_MONGOSTRING;
    // const uri  =  process.env.VITE_APP_MONGOSTRING;
    const client = new MongoClient("mongodb+srv://tejasweekumarsingh:vex2l2htbIlbnGjD@tejas.tokgflw.mongodb.net/");

    try {
        await client.connect();

        const database = client.db('testdatabase'); 
        const collection = database.collection('chatwithpdf'); 

        const filter = {token:token,messageid:messageid }
        const document =  await collection.findOne(filter)
        console.log(document)
        const human = document!.human; 
        const ai = document!.ai;
        return  [human, ai];
        // console.log('Array from document:', human);
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await client.close(); // Close the MongoDB connection
    }
}

export const getAllChatWithPdf = async (token:string)=>{
    const client = new MongoClient("mongodb+srv://tejasweekumarsingh:vex2l2htbIlbnGjD@tejas.tokgflw.mongodb.net/");


    try {
        await client.connect();

        const database = client.db('testdatabase'); 
        const collection = database.collection('chatwithpdf'); 

        const filter = {token:token}
        const cursor = collection.find(filter);
        // Convert the cursor to an array of documents
        const documents = await cursor.toArray();
        if (documents != null){
            const messageids = [];
            const messagenames = [];

            for (const document of documents){
                messageids.push(document.messageid)
                messagenames.push(document.messagename)
            }
            return [messageids,messagenames]
        }
        // const document =  await collection.findOne(filter)
        console.log(documents)
       
        // console.log('Array from document:', human);
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await client.close(); // Close the MongoDB connection
    }

}



const getFileIds = async (token:string,messageid:string) =>{
    const client = new MongoClient("mongodb+srv://tejasweekumarsingh:vex2l2htbIlbnGjD@tejas.tokgflw.mongodb.net/");
    try {
        await client.connect();

        const database = client.db('testdatabase'); 
        const collection = database.collection('chatwithpdf'); 
        const filter = {token:token,messageid:messageid }
        const document =  await collection.findOne(filter)
        console.log(document)
        return document!.fileids
        
    } catch (error) {
        console.log(error)
    }
    finally {
        await client.close(); // Close the MongoDB connection
    }
}