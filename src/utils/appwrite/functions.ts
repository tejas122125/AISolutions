
import { Client, Databases, Storage } from "appwrite";

 const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('660e8a4baeaf25149b31');

 const storage = new Storage(client);
 const databases = new Databases(client);

// import {databases} from "./config"

// import { client, databases, storage } from "./config"
import { Query } from 'appwrite';
// import {type Model} from 'appwrite'

import { ID } from "appwrite"
export const uploadPdf = async (files: File[]): Promise<string[] | undefined> => {

    for (let i = 0; i < files.length; i++) {
        let fileids = [];
        try {
            const response = await storage.createFile(
                '658da6ec42519f39311a',//bucket id
                ID.unique(),
                files[i]
            )
            fileids.push(response.$id)
        } catch (error: any) {
            console.log(error)
        }
        return fileids
    }



}

// // get download link of pdf file using id
// export const getDownloadLink = (id: string) => {
//     const result = storage.getFileDownload(BUCKET_ID, id);
//     return result
// }



export const uploadChatWithPdf = async (token:string, msgid:string, msgname:string, fileids:string) => {
    // const uri = import.meta.env.VITE_APP_MONGOSTRING;

    try {
        const document = {
            token: token,
            messageid: msgid,
            messagename: msgname,
            fileid: fileids,
            human: [],
            ai: []
        };
        const result = await databases.createDocument(
            'aisolution',
            'chatwithpdf',
            ID.unique(),
            
            document
        );
        return result.$id
    } catch (error) {
        console.log(error)
    }




}

export const getChatWithPdfMessages = async (token:string,messageid:string) => {
let human=[];
let ai =[];
    // const uri = import.meta.env.VITE_APP_MONGOSTRING;
    // const uri  =  process.env.VITE_APP_MONGOSTRING;
    try {
        const document = await databases.listDocuments(
            'aisolution',
            'chatwithpdf',
            [
              
          
            ]
        );
        for (let i =0; i<document.documents.length;i++){
            if(document.documents[i].token === token && document.documents[i].messageid === messageid){
                human = document.documents[i].human;
                ai = document.documents[i].ai;

            }

        }
        
        // const human = document.documents!.human; 
        // const ai = document.documents.!.ai;
        // return  [human, ai];
        
    } catch (error) {
        console.log(error)
        
    }
    return [human,ai];
    // console.log(human)
}

// getChatWithPdfMessages("monu","monu")

//     try {
//         await client.connect();

//         const database = client.db('testdatabase'); 
//         const collection = database.collection('chatwithpdf'); 

//         const filter = {token:token,messageid:messageid }
//         const document =  await collection.findOne(filter)
//         console.log(document)
//         const human = document!.human; 
//         const ai = document!.ai;
//         return  [human, ai];
//         // console.log('Array from document:', human);
//     } catch (error) {
//         console.error('Error occurred:', error);
//     } finally {
//         await client.close(); // Close the MongoDB connection
//     }
// }
