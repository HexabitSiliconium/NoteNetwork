const express = require('express');
const morgan = require('morgan');

const app = express();


app.use(morgan('tiny'));//Prints a log in the comman line for each HTTP request
//:method :url :status :res[content-length] - :response-time ms


app.get('/', (req,res) => {
	res.send('PlaceHolder');
});

app.listen(8080, () =>{
	console.log('Server listening on port 8080');
});