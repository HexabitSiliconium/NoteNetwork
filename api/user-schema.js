const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

mongoose.connect('mongodb+srv://Manager:H82QFrKVNCoHY5dE@users-3sb9g.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
	.then(() => {
		console.log("Database connection made");
	}, err => {
		console.log("Error");
	});
	
mongoose.set('useCreateIndex', true);

var noteSchema = new mongoose.Schema({
	name: String,
	image: [String],
	description: String,
	uploader: String,
	tags: [String],
	comments: [String],
	votes: Number
})

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

userSchema.methods.generateHash = (password, salt) => {
	var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512')
		.toString('hex');
	return hash;
}

userSchema.methods.generateJWT = () => {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id: this._id,
		email: this.email,
		exp: parseInt(expiry.getTime() / 1000),
	}, "Secret")
};

var User = mongoose.model('User', userSchema);
var Note = mongoose.model('Note', noteSchema)
module.exports = User, Note;