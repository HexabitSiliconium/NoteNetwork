const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const cors = require('cors');

//var upload = multer();

const app = express();
app.use(cors({ origin:true,credentials: true }));
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
/*
app.post('/', upload.none(), (req, res) => {
	console.log(req.body);
	console.log("REq RECEIVED");
	res.sendStatus(200);
})*/

app.use(methodOverride());

require('./api/user-schema');
require('./api/passport');

const routesApi = require('./api/index');

app.use(passport.initialize());
app.use('/api', routesApi);

app.use((err, req, res, next) => {
	if (err.name ==='UnauthorizedError') {
		res.status(401);
		res.json({
			"message" : err.name + ": " + err.message
		});
	}
})

app.listen(8080, () => console.log("Listening on 8080"));
//start server with nodemon index.js