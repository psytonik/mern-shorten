const jwt = require('jsonwebtoken');
module.exports = async (req,res,next) => {
	if(req.method === 'OPTIONS'){
		return next();
	}

	try{
		const token = req.headers.authorization.split(' ')[1] // Bearer token
		if(!token){
			return res.status(401).json({message:'Token not found, No Authorized User, Log In first',success:false});
		}
		req.user = jwt.verify(token, process.env.JWT_SECRET)
		next();
	}catch (error) {
		res.status(401).json({message:error.message,success:false});
	}
}
