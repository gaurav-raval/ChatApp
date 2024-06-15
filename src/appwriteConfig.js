import { Client, Databases,Account } from "appwrite";
const client = new Client();

// appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),


export const PROJECT_ID = String(import.meta.env.VITE_PROJECT_ID)

export const DATABASE_ID = String(import.meta.env.VITE_DATABASE_ID)

export const COLLECTION_ID_MESSAGES = String(import.meta.env.VITE_COLLECTION_ID_MESSAGES)



client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(`${PROJECT_ID}`);

   export const databases = new Databases(client);

   export const account = new Account(client);

    export default client;