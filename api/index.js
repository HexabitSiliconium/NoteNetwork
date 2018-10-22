const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const multer = require('multer');

const upload = multer({ dest: './uploads/'});

var auth = jwt({
	secret: 'Secret',
	userProperty: 'payload'
});

const profileCtrl = require('./controllers/profile');
const authCtrl = require('./controllers/authentication');

router.post('/upload', upload.none(), profileCtrl.uploadNote);
router.get('/view-notes', profileCtrl.viewNotes);

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

module.exports = router