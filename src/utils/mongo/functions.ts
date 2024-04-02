import { MongoClient } from 'mongodb';


export const uploadDocument =  async (token:string,msgid:string,msgname:string)=> {
    const uri = import.meta.env.VITE_APP_MONGOSTRING;
    
    const client = new MongoClient(uri);

    try {
        await client.connect(); // Connect to MongoDB

        const database = client.db('testdatabse'); 
        const collection = database.collection('chatwithpdf'); 

        // Document to be uploaded
        const document = {
            token: token,
            messageid:msgid,
            messagename:msgname,
            human:[],
            ai:[]
        };

        const result = await collection.insertOne(document);
        console.log(`Document inserted with ID: ${result.insertedId}`);
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await client.close(); // Close the MongoDB connection
    }
}


const getChatWithPdfMessages = async (token:string,messageid:string) => {

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

getChatWithPdfMessages("monu","monu")