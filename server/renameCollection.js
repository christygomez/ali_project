const { MongoClient } = require('mongodb');
const { db } = require('./models/Listing');
require('dotenv').config();
const { ObjectId } = require('mongodb');

async function main() {
  const uri = process.env.CONNECTION_URL;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    await listDatabases(client);

    // await renameCollection(client);
    // await findOneListingBy_id(client, '10091713');
    // await deleteListingsScrapedAfterDate(client, new Date('2019-03-01'));
    // await updateIdToObjectIdForSingleDoc(client, 10051164);
    // await updateAllListingsToHaveObjectIds(client);
    // await updateListing(client, test1);
    // await findOneListingBy_id(client, '10051164');
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
  await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .rename('listingsandreviews');
}

async function findOneListingBy_id(client, id) {
  const result = await client
    .db('sample_airbnb')
    .collection('listingsandreviews')
    .findOne({ _id: id });

  if (result) {
    // console.log(`Found listing with name "${id}", Result: `, result);
    console.log(result._id, result.object_id);
  } else {
    console.log(`No listing found with the name ${id}`);
  }
}

async function deleteListingsScrapedAfterDate(client, date) {
  const result = await client
    .db('sample_airbnb')
    .collection('listingsandreviews')
    .deleteMany({ last_scraped: { $gt: date } });

  console.log(`${result.deletedCount} document(s) deleted`);
}

const namesOfListings = [];

async function updateAllListingsToHaveObjectIds(client) {
  await client
    .db('sample_airbnb')
    .collection('listingsandreviews')
    .find({})
    .forEach((doc) => {
      namesOfListings.push(doc.name);
    })
    .catch();
  // console.log(`${result.matchedCount} document(s) matched query`);
  // console.log(`${result.modifiedCount} document(s) updated`);

  for (let i = 0; i < namesOfListings.length; i++) {
    await updateListing(client, namesOfListings[i]);
  }
  return 'Done';
}

// const test1 = 'Horto flat with small garden';

async function updateListing(client, docname) {
  console.log(docname);
  const result = await client
    .db('sample_airbnb')
    .collection('listingsandreviews')
    .updateOne({ name: docname }, { $set: { new_id: new ObjectId() } })
    .catch();

  console.log(`${result.matchedCount} document(s) matched query`);
  console.log(`${result.modifiedCount} document(s) updated`);
}
