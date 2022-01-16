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

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

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
      // console.log(result)
      res.json(result);
    }
  });
});

app.get('/', (req, res) => {
  res.send("Hello Christy - Ali's Project");
});

// app.post('/createUser', async (req, res) => {
//   const user = req.body;
//   const newUser = new UserModel(user);
//   await newUser.save();

//   res.json(user);
// });

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
