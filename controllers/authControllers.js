const User = require('../models/Users');
const jwt = require('jsonwebtoken');

// Error handler
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // duplicate error code
  if(err.code === 11000) {
    errors.email = "That email already registered.";
    return errors;
  }

  // validate errors
  if(err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}

// jwt-token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_STR_SEC, { expiresIn: maxAge })
}

module.exports.signupGet = (req, res) => {
  res.render('signup');
}

module.exports.loginGet = (req, res) => {
  res.render('login');
}

module.exports.signupPost = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id }); 
  } catch(err) {
    const errors = handleErrors(err); 
    res.status(400).json(errors);
  }
}

module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send('new login');
}