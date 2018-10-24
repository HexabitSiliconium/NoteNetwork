const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const multer = require('multer');

const upload = multer({ dest: './uploads/'});

var auth = jwt({
	secret: 'Secret',
	userProperty: 'payload'
});

//Index to route endpoints

//Endpoint paths
const profileCtrl = require('./controllers/profile');
const authCtrl = require('./controllers/authentication');

//Route to note upload, Multer as middleware to handle multipart/form-data format
router.post('/upload', upload.none(), profileCtrl.uploadNote);
//Route to view notes (get request)
router.get('/view-notes', profileCtrl.viewNotes);
//Route to register
router.post('/register', authCtrl.register);
//Route to login
router.post('/login', authCtrl.login);

module.exports = router