const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const signInController = async(req,res)=>{
	try{
		const errors = validationResult(req);

		if(!errors.isEmpty()){
			res.status(400).json({errors:errors.array(), message:'Wrong Credentials or Short Password'})
			return
		}
		const {email,password} = req.body;

		const user = await User.findOne({email});

		if(!user){
			res.status(400).json({message:'No User with this email',success:false})
			return
		}

		const isMatch = await bcrypt.compare(password,user.password);

		if(!isMatch){
			res.status(400).json({message:'Wrong password, try again',success:false})
			return
		}

		const token = jwt.sign(
			{userId:user.id},
			process.env.JWT_SECRET,
			{expiresIn: '12h'}
		)
		res.status(200).json({token,userId:user.id});

	} catch (e) {
		res.status(500).json({message:e.message,success:false})
	}
}

const signUpController = async (req,res)=>{
	try{
		const errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(400).json({errors:errors.array(),
				message:'Wrong Credentials'})
		}
		const {email,password} = req.body;

		const checkingEmailForDuplicate = await User.findOne({email})
		if(checkingEmailForDuplicate){
			return res.status(400).json({message:'User with this email address already exists',success:false})
		}
		const hashedPassword = await bcrypt.hash(password,10)
		const user = await new User({email,password:hashedPassword});
		await user.save();
		res.status(201).json({message:'User Created',success:true});
	} catch (e) {
		res.status(500).json({message:e.message,success:false});
	}
}

module.exports = {signUpController,signInController}
