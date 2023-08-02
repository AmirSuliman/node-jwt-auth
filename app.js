const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');


const app = express();
// middleware
app.use(express.static('public'));
app.use(express.json());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.MONGO_SEC_KEY;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Successfuly connected to mongodb..."))
  .catch((err) => console.log("cannot connect to mongodb:",err.message));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

app.listen(3000);