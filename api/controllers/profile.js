const mongoose = require('mongoose');
const fs = require('fs');

const User = mongoose.model('User');
const Note = mongoose.model('Note');

module.exports.readProfile = (req, res) => {
	var notes;
	if (!req.payload._id) {
		res.status(401).json({
			"message": "UnauthorizedError: private profile"
		});
	} else {
		User.findById(req.payload._id)
		.exec((err, user) => {
			notes = user.getNotes();
			res.status(200).json(notes);
		});
	}
}

module.exports.viewNotes = (req, res) => {
	Note.find({}, null, (err, notes) => {
		if (err) {
			console.log(err);
		} else {
			res.json(notes);
		}
	})
}

module.exports.uploadNote = (req, res) => {
	console.log("received")
	var note = new Note();
	note.name = req.body.name;
	note.image = req.body.image;
	//note.image.data = fs.readFileSync(req.file.path);
	//note.image.contentType = req.file.name;
	note.description = req.body.description;
	note.save();

	//fs.unlinkSync(req.file.path);
	res.status(200);
	//User.findOne(req.body.uploader).notes.push(note._id);
}