import { MongoClient } from 'mongodb';


const uploadDocument =  async (token,msgid,msgname)=> {
    const uri = 'mongodb://localhost:27017'; // Connection URI
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
            // Add more fields as needed
        };

        // Insert the document into the collection
        const result = await collection.insertOne(document);
        console.log(`Document inserted with ID: ${result.insertedId}`);
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await client.close(); // Close the MongoDB connection
    }
}
