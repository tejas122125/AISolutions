// uploading pdf files in appwrite 

const BUCKET_ID = "658da6ec42519f39311a"


import { client, storage } from "./confis"
import { type Models } from 'appwrite';

import { ID } from "appwrite"
export const uploadPdf = async( files : File[]):Promise<string[]|undefined> =>{

for (let i=0;i<files.length;i++){
    let fileids = [];
    try {
        const response = await storage.createFile(
            '658da6ec42519f39311a',//bucket id
            ID.unique(),
            files[i]
        )
        fileids.push(response.$id)
    } catch (error:any) {
      console.log(error)
    }
    return fileids
}

    
    
}


// get download link of pdf file using id
export const getDownloadLink =(id:string)=>{
    const result = storage.getFileDownload(BUCKET_ID,id);
    return result
}