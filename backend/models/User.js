const {Schema,model,Types} = require('mongoose');

const userSchema = new Schema({
	email:{type:String,required:true, unique:true},
	password:{type:String,required:true, minlength: 8, maxlength: 256},
	links:[{type:Types.ObjectId, ref:'Link'}]
},{timestamps:true});
module.exports = model('User',userSchema);
