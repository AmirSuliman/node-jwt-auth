const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a correct email.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minLength: [6, 'Password should be 6 characters atleast.']
  }
});

// fire a function after doc saved to db
// psot mean after an event occured
// userSchema.post('save', function (doc, next) {
//   console.log("New user created and saved.", doc);
//   next();
// });

// fire a fucntion before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;


