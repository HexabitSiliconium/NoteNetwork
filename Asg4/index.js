const express = require('express');
const morgan = require('morgan');
const lodash = require('lodash');

const app = express();


app.use(morgan('tiny'));//Prints a log in the comman line for each HTTP request
//:method :url :status :res[content-length] - :response-time ms


app.get('/', (req,res) => {
	res.send('PlaceHolder');
});

app.get('/uppercase', (req,res)=>{

	res.send(lodash.upperCase('my little teapot.'));
	var output = lodash.without([1, 2, 3], 1);
	console.log(output);
	console.log('That is working perfectly!');
});



app.listen(8080, () =>{
	console.log('Server listening on port 8080');
});
