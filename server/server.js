const PORT = process.env.PORT || 3001;

require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');

const cors = require('cors');
const bodyParser = require('body-parser');

const ListingModel = require('./models/Listing');

app.use(express.json());
app.use(cors());
app.options('*', cors()); // Need for complex axios requests, including delete.

// app.use(bodyParser.json({ limit: '30mb', extended: true }));
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

/**
 * handle parsing request body
 */
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getListings', (req, res) => {
  ListingModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post('/createListing', async (req, res) => {
  const listing = req.body;
  const newListing = new ListingModel(listing);
  await newListing.save();

  res.json(listing);
});

// Works for new listings that have ObjectId, but old listings from sample db don't have this type of id.
// app.get('/listings/:id', async (req, res) => {
//   await ListingModel.findById(req.params.id)
//     .then((result) => res.json(result))
//     .catch((err) => res.json('Error: ', err));
// });

// Finds individual docs by new_id
app.get('/listings/:new_id', async (req, res) => {
  await ListingModel.find({ new_id: req.params.new_id })
    .then((result) => res.json(result))
    .catch((err) => res.json('Error: ', err));
});

app.delete('/listings/:new_id', cors(), async (req) => {
  await ListingModel.findOneAndDelete({ new_id: req.params.new_id }).catch(
    (err) => console.log('Error: ', err)
  );
});

// THIS WORKS IN POSTMAN?? CHECK IF EDITED
app.delete('/listings/:new_id', cors(), (req, res) => {
  ListingModel.findOneAndDelete({ new_id: req.params.new_id })
    .then((result) =>
      res.json({ mgs: `Listing '${result.name}' deleted successfully` })
    )
    .catch((err) => res.status(404).json({ error: 'Listing not found' }));
});

// app.put('/listings/:id', (req, res) => {
//   ListingModel.findByIdAndUpdate(req.params.id, req.body)
//     .then((listing) => res.json({ msg: 'Updated successfully' }))
//     .catch((err) =>
//       res.status(400).json({ error: 'Unable to update the Database' })
//     );
// });

app.get('/', (req, res) => {
  res.send("Hello Christy - Ali's Project");
});

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
