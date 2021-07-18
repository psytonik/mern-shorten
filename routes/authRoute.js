const {Router} = require('express');
const router = Router();
const {check,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

/// VALIDATION OF COMING DATA FROM FRONT END
const validateSignIn = 	() => {
	return [
		check('email','Wrong Email').normalizeEmail().isEmail().trim(),
		check('password','Short').exists().trim()
	];
}
router.route('/sign-in')
	.post( validateSignIn(),
	async(req,res)=>{
		try{
			const errors = validationResult(req);
			if(!errors.isEmpty()){
				res.status(400).json({errors:errors.array(),
				message:'Wrong Credentials'})
				return
			}
			const {email,password} = req.body;

			const user = await User.findOne({email});
			if(!user){
				res.status(400).json({message:'No User with this email'})
				return
			}

			const isMatch = await bcrypt.compare(password,user.password);
			if(!isMatch){
				res.status(400).json({message:'Wrong password, try again'})
				return
			}

			const token = jwt.sign(
				{userId:user.id},
				process.env.JWT_SECRET,
				{expiresIn: '12h'}
			)
			res.json({token,userId:user.id});

		} catch (e) {
			console.log(e.message);
			res.status(500).json({message:'something wrong in Login, try again'})
		}
	});

/// VALIDATION OF COMING DATA FROM FRONT END
const validateSignUp = () => {
	return [
		check('email','Wrong Email').isEmail(),
		check('password','Short').isLength({min:8})
	]
}
router.route('/sign-up')
	.post( validateSignUp(),
		async (req,res)=>{
		try{
			const errors = validationResult(req);
			if(!errors.isEmpty()){
				return res.status(400).json({errors:errors.array(),
					message:'Wrong Credentials'})
			}
			const {email,password} = req.body;

			const checkingEmailForDuplicate = await User.findOne({email})
			if(checkingEmailForDuplicate){
				res.status(400).json({message:'User with this email address already exists',success:false})
			}
			const hashedPassword = await bcrypt.hash(password,10)
			const user = await new User({email,password:hashedPassword});
			await user.save();
			res.status(201).json({message:'User Created',success:true});
		} catch (e) {
			console.log(e.message)
			res.status(500).json({message:'something wrong, try again',success:false})
		}
	});

module.exports = router;
