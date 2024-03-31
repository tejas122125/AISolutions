// uploading pdf files in appwrite 

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