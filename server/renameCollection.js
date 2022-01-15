const { MongoClient } = require('mongodb');
const { db } = require('./models/Listing');
require('dotenv').config();

async function main() {
  const uri = process.env.CONNECTION_URL;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    // await listDatabases(client);

    // await renameCollection(client);
    
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log('Databases;');

  databasesList.databases.forEach((db) => {
    console.log(` - ${db.name}`);
  });
}

async function renameCollection(client) {
    await client.db("sample_airbnb").collection('listingsAndReviews').rename("listingsandreviews");
  }


 