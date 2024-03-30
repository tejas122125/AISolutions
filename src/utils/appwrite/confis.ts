import { Client, Storage } from "appwrite";

export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('658c3e666ed66b56edb7');

export const storage = new Storage(client);