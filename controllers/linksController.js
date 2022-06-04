const shortid = require("shortid");
const Link = require("../models/Link.js");

const generateLink = async (req, res) => {
	try {
		const baseUrl = process.env.BASE_URL;
		const {from} = req.body;

		const code = shortid.generate();

		const to = `${baseUrl}/${code}`;

		const newLink = new Link({
			code,
			to,
			from,
			owner: req.user.userId
		})

		await newLink.save();
		return res.status(201).json({newLink});

	} catch (error) {
		return res.status(500).json({message: error.message, success: false})
	}
}

const getUserLinks = async (req,res)=>{
	try{
		const links = await Link.find({owner:req.user.userId});
		if(!links){
			return res.status(404).json({message:'User don\'t have links ', success:false})
		}

		res.status(200).json(links)
	} catch (error) {
		res.status(500).json({message:error.message,success:false})
	}
}

const getLinkById = async (req,res)=>{
	try{
		const link = await Link.findById(req.params.id);
		if(!link){
			return res.status(404).json({message:'Link with this id not found',success:false})
		}
		if(req.user.userId == link.owner){
			res.status(200).json(link)
		} else {
			res.status(500).json({message:"You are not Authorized to see that link",success:false})
		}

	} catch (error) {
		res.status(500).json({message:error.message,success:false})
	}
}
const getLinkByIdAndUpdate = async (req,res) => {
	try{
		const linkToUpdate = await Link.findById(req.params.id);
		const newLink = linkToUpdate.to.replace(linkToUpdate.code,req.body.code);
		const alreadyExistCode = await Link.findOne({code:req.body.code});
		if(!linkToUpdate){
			return res.status(404).json({message:'Link with this id not found',success:false})
		} else {
			if(alreadyExistCode){
				return res.status(200).json({message:`Link already exists`,success:false})
			} else {
				linkToUpdate.code = req.body.code;
				linkToUpdate.to = newLink;
				const updatedLink = await linkToUpdate.save();
				res.status(200).json(updatedLink);
			}
		}
	}catch (error) {
		res.status(500).json({message:error.message,success:false})
	}
}

const deleteLinkById = async (req,res)=>{
	try{
		const link = await Link.findById(req.params.id);

		if(req.user.userId == link.owner){
			if(link){
				await link.remove();
				return res.status(200).json({message:"Link successfully removed",success:true})
			}else {
				res.status(404);
				throw new Error('Link not found')
			}
		} else {
			return res.status(401).json({message:"You not owner of the link that you try to delete",success:false});
		}
	}catch (error){
		res.status(500).json({message:error.message,success:false})
	}
}

module.exports = {generateLink,getUserLinks,getLinkById,deleteLinkById,getLinkByIdAndUpdate}
