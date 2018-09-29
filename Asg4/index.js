const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path')

const app = express();

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

app.listen(8080, () =>{
	console.log('Server listening on port 8080');
});