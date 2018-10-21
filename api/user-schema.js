const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb+srv://Manager:H82QFrKVNCoHY5dE@users-3sb9g.mongodb.net/test?retryWrites=true')
	.then(() => {
		console.log("Database connection made");
	}, err => {
		console.log("Error");
	});

var conn = mongoose.connection;

var noteSchema = new mongoose.Schema({
	name: String,
	image: String,
	/*
	image: {
		contentType: String,
		data: Buffer
	},*/
	description: String,
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
	notes: [noteSchema]
})

userSchema.methods.setPassword = (password) => {
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
		.toString('hex');
	this.salt = crypto.randomBytes(16).toString('hex');
};

userSchema.methods.validPassword = (password) => {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
		.toString('hex');
	return this.hash === hash;
};

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