const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const cors = require('cors');

const app = express();
//Server app

//Enable cors and bodyparser
app.use(cors({ origin: true , credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Enable method override for put and delete requests
app.use(methodOverride());
//Loading scripts for user-schema and passport
require('./api/schemas');
require('./api/passport');
//Initialize passport
app.use(passport.initialize());
//Path to Router
const routesApi = require('./api/index');
//Redirect calls to */api to the router
app.use('/api', routesApi);
//401 unauthorized error
app.use((err, req, res, next) => {
	if (err.name ==='UnauthorizedError') {
		res.status(401);
		res.json({
			"message" : err.name + ": " + err.message
		});
	}
})

app.listen(8080, () => console.log("Listening on 8080"));