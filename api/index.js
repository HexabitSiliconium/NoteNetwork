const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const multer = require('multer');
const bodyParser = require('body-parser');

const upload = multer({ dest: './uploads/'});

var auth = jwt({
	secret: 'Secret',
	userProperty: 'payload'
});

//Index to route endpoints

//Endpoint paths
const noteCtrl = require('./controllers/notes');
const authCtrl = require('./controllers/authentication');
//Route to note upload, Multer as middleware to handle multipart/form-data format
router.post('/upload', noteCtrl.uploadNote);
//Route to view notes (get request)
router.get('/view-notes', noteCtrl.viewNotes);
//Route to view note details/individual note
router.post('/view-note-details', bodyParser.json(), noteCtrl.viewNoteDetails);
//Route to upload comment
router.post('/add-comment', bodyParser.json(), noteCtrl.addComment);
//Route to upvote/downvote
router.post('/vote', bodyParser.json(), noteCtrl.vote);
//Route to register
router.post('/register', bodyParser.json(), authCtrl.register);
//Route to login
router.post('/login', bodyParser.json(), authCtrl.login);

module.exports = router