
import { Client, Databases, Storage } from "appwrite";

 const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('660e8a4baeaf25149b31');

 const storage = new Storage(client);
 const databases = new Databases(client);


// export const getDownloadLink = (id) => {
//     const result = storage.getFileDownload("660e8aa1521417614a44", id);
//     console.log(result)
//     // return result
// }

// getDownloadLink("6614c97111f21f9ec913")
const updateChat = async()=>{
    try {

        const document = await databases.updateDocument(
            'aisolution',
            'chatwithpdf',
            "6614d27a5d8736c4d9aa",
            {
                "ai":["tejasweee"]
            }
        );
        console.log(document)

    } catch (error) {
        console.log(error)
    }
}

updateChat()