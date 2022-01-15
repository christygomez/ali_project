const PORT = process.env.PORT || 3001;

require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');

const cors = require('cors');

app.use(express.json());
app.use(cors());

const UserModel = require('./models/Users');
const ListingModel = require('./models/Users');

// app.get('/getUsers', (req, res) => {
//   UserModel.find({}, (err, result) => {
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

app.post('/createUser', async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
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
