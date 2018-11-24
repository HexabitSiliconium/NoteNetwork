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
			res.sendStatus(404);
		} else {
			res.json(notes);
			res.status(200);
		}
	})
}

//Endpoint to view individual note
module.exports.viewNoteDetails = (req, res) => {
	//Finds single note in the collection and sends it as JSON
	Note.findById(req.body._id, null, (err, note) => {
		if (err) {
			console.log(err);
			res.status(404);
		} else {
			res.json(note);
			res.status(200);
		}
	})
}

//Endpoint to upload notes
module.exports.uploadNote = (req, res) => {
	//Creates new note model
	var note = new Note();
	//Setting note fields based on request body
	note.name = req.body.name;
	note.image = req.body.image;
	note.description = req.body.description;
	tags = JSON.parse(req.body.tags);
	for (var n in tags) {
		note.tags.push(tags[n].display);
	}
	note.uploader = req.body.uploader;
	//Finds user that uploaded note, and pushes note ID to their list of uploaded notes
	User.findByIdAndUpdate({ username: req.body.uploader },
		{$push: {notes: note._id}});
	//Save note
	note.save();
	req.sendStatus(200);
}

module.exports.addComment = (req, res) => {
	Note.findById({ _id: req.body._id}, 
		{$push: {comments: req.body.comment}});
	res.sendStatus(200);
}