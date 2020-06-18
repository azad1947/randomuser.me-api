'use strict';

const express = require('express');
const app = express();
const get_summary = require('./routes/get_summery');

//view engine setup
app.set('view engine', 'ejs');

app.get('/', get_summary);

app.listen(3000, ()=>console.log('app is listening at 3000.'));
