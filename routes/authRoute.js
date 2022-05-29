const {Router} = require('express');
const router = Router();
const {check} = require('express-validator')
const {signInController, signUpController} = require("../controllers/authController.js");

/// VALIDATION OF COMING DATA FROM FRONT END
const validateSignIn = 	() => {
	return [
		check('email','Wrong Email').normalizeEmail().isEmail().trim(),
		check('password','Short').exists().trim()
	];
}
router.route('/sign-in')
	.post(validateSignIn(), signInController);

/// VALIDATION OF COMING DATA FROM FRONT END
const validateSignUp = () => {
	return [
		check('email','Wrong Email').isEmail(),
		check('password','Short').isLength({min:8})
	]
}
router.route('/sign-up')
	.post(validateSignUp(),signUpController);

module.exports = router;
