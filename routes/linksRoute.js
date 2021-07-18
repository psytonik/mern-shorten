const {Router} = require('express');
const Link = require('../models/Link.js')
const shortid = require('shortid');
const authMiddleware = require('../middleware/auth.middleware.js');

const router = Router();

router.route('/generate')
	.post(authMiddleware,async (req,res)=>{
		try{
			const baseUrl = process.env.BASE_URL;
			const {from} = req.body;
			const code = shortid.generate();
			const existingLink = await Link.findOne({from});
			if(existingLink){
				return res.status(200).json({link:existingLink});
			}
			const to = baseUrl + '/' + code;

			const newLink = new Link({
				code,to,from,owner:req.user.userId
			})
			await newLink.save();
			res.status(201).json({newLink});
		} catch (error) {
			res.status(500).json({message:error.message,success:false})
		}
	})

router.route('/')
	.get(authMiddleware, async (req,res)=>{
		try{
			const links = await Link.find({owner:req.user.userId}) ;

			if(!links){
				return res.status(404).json({message:'User don\'t have links ',success:false})
			}

			res.status(200).json(links)
		} catch (error) {
			res.status(500).json({message:error.message,success:false})
		}
	})

router.route('/:id')
	.get(authMiddleware,async (req,res)=>{
		try{
			const link = await Link.findById(req.params.id);

			if(!link){
				return res.status(404).json({message:'Link with this id not found',success:false})
			}

			res.status(200).json(link)
		} catch (error) {
			res.status(500).json({message:error.message,success:false})
		}
	})

module.exports = router;

