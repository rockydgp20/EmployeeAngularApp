var express = require('express');
var app = express();
var port = process.env.PORT || 8080
var morgan = require('morgan');
var mongoose = require('mongoose')
const cors = require('cors');
// const user = require('./app/models/user')
// const path = require('path');
app.use(morgan('dev'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'))

// DB connection Starts here
mongoose.connect('mongodb://localhost:27017/CrudDB', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB CONNECTED');
});

const employees = require('./controllers/emplyeeController')
app.use('/employees', employees)
app.use(cors({ origin: 'http://localhost:4200'}));

// app.get('*', (req,res) => {
//     res.sendFile(path.join(__dirname +  '/public/app/views/index.html'));
// })

app.listen(port, () => {
    console.log('Server running successfully on Port :' + port);
});