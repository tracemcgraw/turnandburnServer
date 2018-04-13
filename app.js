require('dotenv').config();
var express = require('express');
var app = express();
var test = require('./controllers/testcontroller');
var user = require('./controllers/usercontroller');
var log = require('./controllers/logcontroller');
var sequelize = require('./db');
var bodyParser = require('body-parser');
sequelize.sync();
app.use(bodyParser.json())

app.use(require('./middleware/headers'));
app.use('/test', test)
app.use('/api/user', user);

app.use(require('./middleware/validate-session'));
app.use('/api/log', log);
app.listen(3000, function(){
    console.log('Hey!! We are running!')
})
app.use('/api/test', function(req, res){
    res.send("This is data from the /api/test endpoint. It's from the Server.");
})