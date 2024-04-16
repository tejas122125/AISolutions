
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
    let fileids = [];
    for (let i = 0; i < files.length; i++) {

        try {
            const response = await storage.createFile(
                '660e8aa1521417614a44',//bucket id
                ID.unique(),
                files[i]
            )
            fileids.push(response.$id)
        } catch (error: any) {
            console.log(error)
        }

    }

    return fileids

}

// get download link of pdf file using id
export const getDownloadLink = (id: string) => {
    const result = storage.getFileView("660e8aa1521417614a44", id);
    // console.log(result)
    return result
}

// getDownloadLink("661195a4cc490261d2b1")

export const uploadChatWithPdf = async (token: string, msgid: string, msgname: string, fileids: string[]) => {
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

export const getChatWithPdfMessages = async (token: string, messageid: string) => {
    let human = [];
    let ai = [];
    // const uri = import.meta.env.VITE_APP_MONGOSTRING;
    // const uri  =  process.env.VITE_APP_MONGOSTRING;
    try {
        const document = await databases.listDocuments(
            'aisolution',
            'chatwithpdf',
            [


            ]
        );
        for (let i = 0; i < document.documents.length; i++) {
            if (document.documents[i].token === token && document.documents[i].messageid === messageid) {
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
    return [human, ai];
    // console.log(human)
}

// getChatWithPdfMessages("monu","monu")




export const getAllChatWithPdf = async (token: string) => {
    let messageid = []
    let messagename = []

    try {
        const document = await databases.listDocuments(
            'aisolution',
            'chatwithpdf',
            [


            ]
        );

        for (let i = 0; i < document.documents.length; i++) {
            if (document.documents[i].token === token) {
                messageid.push(document.documents[i].messageid);
                messagename.push(document.documents[i].messagename);

            }

        }


        // console.log('Array from document:', human);
    } catch (error) {
        console.error('Error occurred:', error);
    }
    return [messageid, messagename]
}


export const getFileIds = async (token: string, messageid: string): Promise<string[]> => {
    let fileid = []
    try {

        const document = await databases.listDocuments(
            'aisolution',
            'chatwithpdf',
            [


            ]
        );

        for (let i = 0; i < document.documents.length; i++) {
            if (document.documents[i].token === token && document.documents[i].messageid === messageid) {
                fileid = document.documents[i].fileid;

            }

        }

    } catch (error) {
        console.log(error)
    }
    return fileid;
    // console.log(fileid)
}



const updateChat = async(documentid : string,aichat:string[],humanchat:string[])=>{
    
    const data ={
        "human":humanchat,
        "ai":aichat
    }
    
    try {
        const document = await databases.updateDocument(
            'aisolution',
            'chatwithpdf',
            documentid,
            data
        );
        // console.log(document)

    } catch (error) {
        console.log(error)
    }
}

export const uploadCsv = async (file:File): Promise<string | undefined> => {
        try {
            const response = await storage.createFile(
                '661e68f25c8def076aa2',//bucket id
                ID.unique(),
                file
            )
            return response.$id
            
        } catch (error: any) {
            console.log(error)
        }
}


export const getCsvFileIds = async (token: string, messageid: string): Promise<string[]> => {
    let fileid = []
    try {

        const document = await databases.listDocuments(
            'aisolution',
            'chatwithpdf',
            [


            ]
        );

        for (let i = 0; i < document.documents.length; i++) {
            if (document.documents[i].token === token && document.documents[i].messageid === messageid) {
                fileid = document.documents[i].fileid;

            }

        }

    } catch (error) {
        console.log(error)
    }
    return fileid;
    // console.log(fileid)
}