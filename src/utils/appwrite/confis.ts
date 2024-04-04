import { Client, Databases, Storage } from "appwrite";

export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('660e8a4baeaf25149b31');

export const storage = new Storage(client);
export const databases = new Databases(client);
