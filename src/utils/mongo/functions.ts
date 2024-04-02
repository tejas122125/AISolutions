import { MongoClient } from 'mongodb';


const uploadDocument =  async ()=> {
    const uri = 'mongodb://localhost:27017'; // Connection URI
    const client = new MongoClient(uri);

    try {
        await client.connect(); // Connect to MongoDB

        const database = client.db('your_database_name'); // Replace 'your_database_name' with your actual database name
        const collection = database.collection('your_collection_name'); // Replace 'your_collection_name' with your actual collection name

        // Document to be uploaded
        const document = {
            key1: 'value1',
            key2: 'value2',
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
