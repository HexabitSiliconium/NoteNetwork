const express = require('express');
const morgan = require('morgan');

const lodash = require('lodash');
const fs = require('fs');
const path = require('path')

const app = express();

const jsdom = require('jsdom');
const $ = require('jquery')(new jsdom.JSDOM().window);

$("body").append("<p>Test Paragraph</p>");
//$("<h1>test header</h1>").appendTo("body");
console.log($("body").html());

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs.log'), { flags: 'a' })

app.use(morgan('tiny', {stream: accessLogStream}));//Prints a log in the comman line for each HTTP request
//:method :url :status :res[content-length] - :response-time ms

try {
	var readLog = fs.readFileSync('./logs.log');
} catch(e) {
	var readLog = e.stack;
}

app.get('/logs', (req, res) =>  {
	res.send(readLog.toString());
});

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
