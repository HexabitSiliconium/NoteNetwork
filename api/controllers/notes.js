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
			res.json(notes).status(200);
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
			res.json(note).status(200);
		}
	})
}

//Endpoint to upload notes
module.exports.uploadNote = (req, res) => {
	var reqBody = '';
	var body = {};
    req.on('data', chunk => {
        reqBody += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
		body = JSON.parse(reqBody);
		//Creates new note model
		var note = new Note();
		//Setting note fields based on request body
		note.name = body.name;
		note.image = body.image;
		note.description = body.description;
		tags = JSON.parse(body.tags);
		for (var n in tags) {
			note.tags.push(tags[n].display);
		}
		note.uploader = body.uploader;
		//Finds user that uploaded note, and pushes note ID to their list of uploaded notes
		User.findByIdAndUpdate({ username: body.uploader },
			{$push: {notes: note._id}});
		//Save note
		note.save();
		res.sendStatus(200);
	});
}

module.exports.addComment = (req, res) => {
	Note.findByIdAndUpdate({ _id: req.body._id }, 
		{$push: {comments: req.body.comment}});
	res.sendStatus(200);
}

module.exports.vote = (req, res) => {
	Note.findByIdAndUpdate({ _id: req.body._id }, 
		{$inc: { votes: req.body.vote }}
	);
	res.sendStatus(200);
}