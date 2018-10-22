const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const cors = require('cors');

const app = express();
app.use(cors({ origin:true,credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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