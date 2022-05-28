const Link = require("../models/Link.js");

const redirectController = async(req,res)=>{
	try{
		const link = await Link.findOne({code:req.params.code});
		if(link){
			link.clicks++
			link.clicksDate.push(new Date())
			await link.save();
			return res.redirect(link.from);
		}
		res.status(404).json({message:'Link not Found'});
	}catch (error) {
		res.status(500).json({message:error.message,success:false})
	}
}
module.exports = {redirectController}
