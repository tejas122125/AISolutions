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


const getChatWithPdfMessages = () => {
    
    const uri = import.meta.env.VITE_APP_MONGOSTRING;
    const client = new MongoClient(uri);

    try {
        await client.connect(); // Connect to MongoDB

        const database = client.db('your_database_name'); // Replace 'your_database_name' with your actual database name
        const collection = database.collection('your_collection_name'); // Replace 'your_collection_name' with your actual collection name

        // Query the document from the collection
        const document = await collection.findOne({ /* Your query */ });

        // Access the array field within the document
        const arrayData = document.arrayField; // Replace 'arrayField' with the actual field name

        console.log('Array from document:', arrayData);
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await client.close(); // Close the MongoDB connection
    }
}
