//Run: node index.js
//TODO: connect to db in multiple files

const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {

  const uri = process.env.CONNECTION_URL;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    // await deleteListingsScrapedBeforeDate(client, new Date('2020-02-28'));

    // await deleteListingByName(client, 'Cozy Cottage');

    // await updateAllListingsToHavePropertyType(client);

    // await upsertListingByName(client, 'Cozy Cottage B', {
    //   name: 'Cozy Cottage',
    //   bedrooms: 4,
    //   bathrooms: 3,
    // });

    // await updateListingByName(client, "Ali's Loft MULT 2", {
    //   bedrooms: 6,
    //   bathrooms:3,
    //   beds: 8,
    // });

    // await findListingsWithMinBedsBathsAndRecentReviews(client, {
    //   minBeds: 1,
    //   minBaths: 1,
    //   maxResults: 5,
    // });

    // await findOneListingBy_id(client, "10006546");

    // await findOneListingByName(client, "Ali's Loft MULT 2");

    // await listDatabases(client);

    // await createListing(client, {
    //   name: "Infinite Views",
    //   summary: 'Sample place to test mongodb transactions',
    //   bedrooms: 3,
    //   bathrooms: 2,
    // });

    // await createMultipleListings(client, [
    //   {
    //     name: "Ali's Loft MULT 1",
    //     summary: 'A place with a brown couch',
    //     bedrooms: 1,
    //     bathrooms: 1,
    //   },
    //   {
    //     name: "Ali's Loft MULT 2",
    //     summary: 'A place with a brown couch',
    //     bedrooms: 1,
    //     bathrooms: 1,
    //   },
    // ]);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function deleteListingsScrapedBeforeDate(client, date) {
  const result = await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .deleteMany({ last_scraped: { $lt: date } });

  console.log(`${result.deletedCount} document(s) deleted`);
}

async function deleteListingByName(client, nameOfListing) {
  const result = await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .deleteOne({ name: nameOfListing });

  console.log(`${result.deletedCount} document(s) deleted`);
}

async function updateAllListingsToHavePropertyType(client) {
  const result = await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .updateMany(
      { property_type: { $exists: false } },
      { $set: { property_type: 'Unknown' } },
      { upsert: true }
    );

  console.log(`${result.matchedCount} document(s) matched query`);
  console.log(`${result.modifiedCount} document(s) updated`);
}

//upsert updates if exists, else inserts it
async function upsertListingByName(client, nameOfListing, updatedListing) {
  const result = await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .updateOne(
      { name: nameOfListing },
      { $set: updatedListing },
      { upsert: true }
    );

  console.log(`${result.matchedCount} document(s) matched query`);

  if (result.upsertedCount > 0) {
    console.log(`One document inserted, ID: ${result.upsertedId}`);
  } else {
    console.log(`${result.modifiedCount} document(s) updated`);
  }
}

async function updateListingByName(client, nameOfListing, updatedListing) {
  const result = await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .updateOne({ name: nameOfListing }, { $set: updatedListing });

  console.log(`${result.matchedCount} document(s) matched query`);
  console.log(`${result.modifiedCount} document(s) updated`);
}

async function findListingsWithMinBedsBathsAndRecentReviews(
  client,
  { minBeds = 0, minBaths = 0, maxResults = Number.MAX_SAFE_INTEGER } = {}
) {
  const cursor = client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .find({
      bedrooms: { $gte: minBeds },
      bathrooms: { $gte: minBaths },
    })
    .sort({ last_Review: -1 })
    .limit(maxResults);

  const results = await cursor.toArray();

  if (results.length > 0) {
    console.log(`Results Found: `);
    results.forEach((result, i) => {
      console.log(`${i + 1}. NAME: ${result.name}`);
      console.log(`ID: ${result._id}`);
      console.log(`BEDROOMS: ${result.bedrooms}`);
      console.log(`BATHROOMS: ${result.bathrooms}`);
      console.log(
        `MOST RECENT REVIEW DATE: ${new Date(
          result.last_review
        ).toDateString()}`
      );
    });
  } else {
    console.log('NOTHING FOUND');
  }
}

async function findOneListingBy_id(client, id) {
  const result = await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .findOne({ _id: id });

  if (result) {
    console.log(`Found listing with name "${id}", Result: `, result);
    // console.log(result);
  } else {
    console.log(`No listing found with the name ${id}`);
  }
}

//* findOne only returns first item that matches even if there are more
async function findOneListingByName(client, nameOfListing) {
  const result = await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .findOne({ name: nameOfListing });

  if (result) {
    console.log(`Found listing with name "${nameOfListing}", Result: `, result);
    // console.log(result);
  } else {
    console.log(`No listing found with the name ${nameOfListing}`);
  }
}

async function createMultipleListings(client, newListings) {
  const result = await client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .insertMany(newListings);

  console.log(`${result.insertedCount} new listings created with id(s):`);

  console.log(result.insertedIds);
}

//* insertOne may be slow if waiting to enter one by one, insertMany more efficient
// async function createListing(client, newListing) {
//   const result = await client
//     .db('sample_airbnb')
//     .collection('listingsAndReviews')
//     .insertOne(newListing);
//   console.log(`New Listing created with id ${result.insertedId}`);
// }

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log('Databases;');

  databasesList.databases.forEach((db) => {
    console.log(` - ${db.name}`);
  });
}
