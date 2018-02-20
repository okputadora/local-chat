var mongoose = require('mongoose')

var ProfileSchema = new mongoose.Schema({
	firstName: {type:String, trim:true, lowercase:true, required:true, default:''},
	lastName: {type:String, trim:true, lowercase:true, required:true, default:''},
	email: {type:String, trim:true, lowercase:true, required:true, default:''},
	password: {type:String, required:true, default:''},
	timestamp: {type:Date, default:Date.now}
})
// create a summary to hide the password because the api is theoretically accessible
// by anyone. summary is an instance method (not a class method) -- every profile instance in the database
// can use this function. method is called on the actual instance of the object
// not a class. a class relates to the entire category of data like a TYPE.
// an instance is particular TOKEN ...js is not an object oriented program
ProfileSchema.methods.summary = function(){
	var summary = {
		firstName: this.firstName,
		lastName: this.lastName,
		email: this.email,
		id: this._id
	}
	return summary;
}
module.exports = mongoose.model('ProfileSchema', ProfileSchema)
