const mongoose = require('mongoose');

const connectionToDb = async () => {
	try{
		await mongoose.connect(process.env.DB_URI, {
			useNewUrlParser:true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		})
	}catch (e) {
		console.log('DB ERROR', e.message);
		process.exit(1);
	}
}
module.exports = connectionToDb;
