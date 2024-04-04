// uploading pdf files in appwrite 

const BUCKET_ID = "658da6ec42519f39311a"


import { client, databases, storage } from "./confis"
import { type Models } from 'appwrite';

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

// get download link of pdf file using id
export const getDownloadLink = (id: string) => {
    const result = storage.getFileDownload(BUCKET_ID, id);
    return result
}



export const uploadChatWithPdf = async (token: string, msgid: string, msgname: string, fileids: string[]) => {
    // const uri = import.meta.env.VITE_APP_MONGOSTRING;

    try {
        const document = {
            token: token,
            messageid: msgid,
            messagename: msgname,
            fileids: fileids,
            human: [],
            ai: []
        };
        const result = await databases.createDocument(
            'aisolution',
            'chatwithpdf',
            ID.unique(),
            { "title": "Hamlet" }
        );
        return result.$id
    } catch (error) {
        console.log(error)
    }




}
