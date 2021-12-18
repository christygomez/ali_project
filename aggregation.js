//Run: node aggregation.js

//! REPEATED CODE BELOW, TODO: connect to db in multiple files

const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {

  const uri = process.env.CONNECTION_URL;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    await printCheapestSuburbs(client, "Australia", "Sydney", 10);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

//! REPEATED CODE ABOVE

/**
 * Print the cheapest suburbs for a given market
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {String} country The country for the given market
 * @param {String} market The market you want to search
 * @param {number} maxNumberToPrint The maximum number of suburbs to print
 */
async function printCheapestSuburbs(client, country, market, maxNumberToPrint) {
    const pipeline = [
        {
            '$match': {
                'bedrooms': 1,
                'address.country': country,
                'address.market': market,
                'address.suburb': {
                    '$exists': 1,
                    '$ne': ''
                },
                'room_type': 'Entire home/apt'
            }
        }, {
            '$group': {
                '_id': '$address.suburb',
                'averagePrice': {
                    '$avg': '$price'
                }
            }
        }, {
            '$sort': {
                'averagePrice': 1
            }
        }, {
            '$limit': maxNumberToPrint
        }
    ];

    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#aggregate for the aggregate() docs
    const aggCursor = client.db("sample_airbnb").collection("listingsAndReviews").aggregate(pipeline);

    await aggCursor.forEach(airbnbListing => {
        console.log(`${airbnbListing._id}: ${airbnbListing.averagePrice}`);
    });
}
