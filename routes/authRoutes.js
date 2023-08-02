const app = require('express');
const router = app.Router();
const authController = require('../controllers/authControllers');

router.get('/signup',authController.signupGet);
router.post('/signup',authController.signupPost);
router.get('/login',authController.loginGet);
router.post('/login',authController.loginPost);

module.exports = router;