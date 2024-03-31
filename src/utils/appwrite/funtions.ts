// uploading pdf files in appwrite 

const BUCKET_ID = "658da6ec42519f39311a"


import { client, storage } from "./confis"
import { type Models } from 'appwrite';

import { ID } from "appwrite"
export const uploadPdf = async( file : File) :Promise<Models.File |undefined>=>{
    const clt:any = client
    const stg:any = storage
    try {
        const response = await storage.createFile(
            '658da6ec42519f39311a',
            ID.unique(),
            file
        )
        return  response
    } catch (error:any) {
      console.log(error)
    }
    
}


// get download link of pdf file using id
export const getDownloadLink =(id:string)=>{
    const result = storage.getFileDownload(BUCKET_ID,id);
    return result
}