const PORT = process.env.PORT || 3001;

require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// const UserModel = require('./models/Users');
const ListingModel = require('./models/Listing');

app.use(express.json());
app.use(cors());

// app.use(bodyParser.json({ limit: '30mb', extended: true }));
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

/**
 * handle parsing request body
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/getUsers', (req, res) => {
//   UserModel.find({}, (err, result) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

// app.post('/createUser', async (req, res) => {
//   const user = req.body;
//   const newUser = new UserModel(user);
//   await newUser.save();

//   res.json(user);
// });

// app.get('/getListings', (req, res) => {
//   ListingModel.find({}, (err, result) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

app.get('/getListings', (req, res) => {
  ListingModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// app.get('/:id', (req, res) => {
//   ListingModel.findOne({ id: req.params.id }, (err, result) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

app.get('/:id', (req, res) => {
  ListingModel.findOne({ id: req.params.id }, (err, result) => {
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

app.put('/listings/:id', (req, res) => {
  ListingModel.findByIdAndUpdate(req.params.id, req.body)
    .then((listing) => res.json({ msg: 'Updated successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

app.delete('/listings/:id', (req, res) => {
  ListingModel.findByIdAndRemove(req.params.id, req.body)
    .then((listing) => res.json({ mgs: 'Listing deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'Listing not found' }));
});

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
