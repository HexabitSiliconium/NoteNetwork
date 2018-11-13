const mongoose = require('mongoose');

const User = mongoose.model('User');
const Note = mongoose.model('Note');
//Endpoint to handle notes/profile

//Endpoint to view notes
module.exports.viewNotes = (req, res) => {
	//Finds all notes in the collection and sends them as JSON
	Note.find({}, null, (err, notes) => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).json(notes);
		}
	})
}

//Endpoint to view individual note
module.exports.viewNoteDetails = (req, res) => {
	//Finds single note in the collection and sends it as JSON
	Note.findById(req.body._id, null, (err, note) => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).json(note);
		}
	})
}

//Endpoint to upload notes
module.exports.uploadNote = (req, res) => {
	//Creates new note model
	var note = new Note();
	//Setting note fields based on request body
	note.name = req.body.name;
	note.image.push(req.body.image);
	note.description = req.body.description;
	note.tags.push(req.body.tags);
	note.uploader = req.body.uploader;
	//Finds user that uploaded note, and pushes note ID to their list of uploaded notes
	User.findByIdAndUpdate({ username: req.body.uploader },
		{$push: {notes: note._id}});
	//Save note
	note.save();
	//Send back 200 status
	res.sendStatus(200);
}