// uploading pdf files in appwrite 

import { client, storage } from "./confis"
import { ID } from "appwrite"
export const uploadPdf = async( file : File)=>{
    const clt:any = client
    const stg:any = storage
    try {
        const response = await storage.createFile(
            '658da6ec42519f39311a',
            ID.unique(),
            file
        )
        return  response
    } catch (error) {
       return error
    }
    
}