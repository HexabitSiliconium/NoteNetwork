const mongoose = require('mongoose');

const User = mongoose.model('User');
const Note = mongoose.model('Note');

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
	var note = new Note();
	note.name = req.body.name;
	note.image.push(req.body.image);
	note.description = req.body.description;
	note.tags.push(req.body.tags);
	note.uploader = req.body.uploader;
	User.findByIdAndUpdate({ username: req.body.uploader },
		{$push: {notes: note._id}});

	note.save();

	res.sendStatus(200);
}