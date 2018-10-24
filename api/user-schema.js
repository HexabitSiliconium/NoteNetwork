const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

//Making connection to DB
///Note:Unsure about username and password sitting here?
mongoose.connect('mongodb+srv://Manager:H82QFrKVNCoHY5dE@users-3sb9g.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
	.then(() => {
		console.log("Database connection made");
	}, err => {
		console.log("Error");
	});
//Avoids deprecation warning
mongoose.set('useCreateIndex', true);
//Schema for notes
var noteSchema = new mongoose.Schema({
	name: String,
	image: [String],
	description: String,
	uploader: String,
	tags: [String],
	comments: [String],
	votes: Number
})
//Schema for users
var userSchema = new mongoose.Schema({
	username: String,
	email: {
		type: String,
		required: true,
		unique: true,
	},
	hash: String,
	salt: String,
	notes: [String]
})
//Generate hash method for user, used for password
userSchema.methods.generateHash = (password, salt) => {
	var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512')
		.toString('hex');
	return hash;
}
//Generate JWT token for users, used for session
userSchema.methods.generateJWT = () => {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id: this._id,
		email: this.email,
		exp: parseInt(expiry.getTime() / 1000),
	}, "Secret")
};
//Creating models and exporting them
var User = mongoose.model('User', userSchema);
var Note = mongoose.model('Note', noteSchema)
module.exports = User, Note;