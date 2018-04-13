var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('Hey! This is a test route!')
});

module.exports = router;