const {Schema,model,Types} = require('mongoose');

const LinkSchema = new Schema({
	from: {type:String,required:true},
	to: {type:String,required:true, unique:true},
	code: {type:String,required:true,unique:true},
	clicksDate:[{type:Date,default:Date.now }],
	clicks: {type:Number,default:0},
	owner: {type:Types.ObjectId,ref:'User'}
},{timestamps:true});
module.exports = model('Link',LinkSchema);
