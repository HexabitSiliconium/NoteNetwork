const express = require('express');

// Init App
const app = express();

app
  .use('/', require('./components/loginapp/app'))
  .use('/mongo_uploads', require('./components/mongo_uploads/app'))
  .use('/view_notes', require('./components/view_notes/app'));