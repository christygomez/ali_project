//! REPEATED CODE BELOW, TODO: connect to db in multiple files
const { MongoClient } = require('mongodb');
require('dotenv').config();

/**
 * This script creates 3 new users in the users collection in the sample_airbnb database.
 * The users collection does not need to exist before running this script.
 * This script also creates a unique index on the email field in the users collection.
 * 
 * You will see "duplicate key" errors if you attempt to run this script more than once 
 * without dropping the documents in the users collection, because the unique index will 
 * not allow you to insert more than one document into the collection with the same email address.
 */

async function main() {
    const uri = process.env.CONNECTION_URL;

    const client = new MongoClient(uri);

    try {
     
        await client.connect();

        await createMultipleUsers(client, [
            {
                email: "leslie@example.com",
                name: "Leslie Yepp"
            },
            {
                email: "april@example.com",
                name: "April Ludfence"
            },
            {
                email: "tom@example.com",
                name: "Tom Haverdodge"
            }
        ]);

        // Create a unique index on the email field in the users collection.
        // Note that if you run this script when you already have duplicate emails in the user collection, 
        // MongoDB will be unable to create the unique index.
        const createIndexResults = await client.db("sample_airbnb").collection("users").createIndex({ "email": 1 }, { unique: true });
        console.log(`Index successfully created: ${createIndexResults}`);

    } finally {
        await client.close();
    }
}

main().catch(console.error);

/**
 * Create multiple users
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {Object[]} newUsers The new users to be added
 */
async function createMultipleUsers(client, newUsers) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany for the insertMany() docs
    const result = await client.db("sample_airbnb").collection("users").insertMany(newUsers);

    console.log(`${result.insertedCount} new user(s) created with the following id(s):`);
    console.log(result.insertedIds);
}