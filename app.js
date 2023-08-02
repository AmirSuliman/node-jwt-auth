const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const dotEnv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express();

dotEnv.config();
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

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

// // cookies
// app.get('/set-cookies', (req, res) => {
//   // res.setHeader('Set-cookie', 'newUser=true');
//   res.cookie('newUser', false);
//   res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24 /**, httpOnly: true  */ });
  
//   res.send("cookie is set.");
// });

// app.get('/read-cookies', (req, res) => {
//   const cookie = req.cookies;
//   console.log(cookie);
//   res.json(cookie);  
// });

app.listen(3000);