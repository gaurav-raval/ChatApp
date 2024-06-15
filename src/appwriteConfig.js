import { Client, Databases,Account } from "appwrite";
const client = new Client();


export const PROJECT_ID = "665b56ed001938a19263"

export const DATABASE_ID = "665b58670016ba68c5a5"

export const COLLECTION_ID_MESSAGES = "665b5871001d77463a9e"




client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('665b56ed001938a19263');

   export const databases = new Databases(client);

   export const account = new Account(client);

    export default client;