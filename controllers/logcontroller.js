var router = require('express').Router();
var sequelize = require('../db');
var LogTestModel = sequelize.import('../models/log')
var User = sequelize.import('../models/user');

router.post('/', function(req, res){ //Allows users to create a workout log with descriptions, results, and owner properties.
    console.log(req.body)
    var owner = req.user.id;
    var description = req.body.logtestdata.description;
    var result = req.body.logtestdata.result;
    var definition = req.body.logtestdata.def;
    LogTestModel
    .create({
        description: description,
        owner: owner,
        result: result,
        def: definition

    })
    .then(
        function createSuccess(logtestdata){
            res.json({
                logtestdata: logtestdata
            });
        },
        function createError(err){
            res.send(500, err.message);
        }
    );
});
router.get('/', function(req, res){ //Gets all logs for an individual user.
    var userid = req.user.id;

    LogTestModel
    .findAll({
        where: { owner: userid }
    })
    .then(
       function findAllSuccess(data){
           res.json(data);
       },
       function findAllError(err){
           res.send(500, err.message)
       }
    );
});
router.get('/:id', function(req, res){ //Gets individual logs by id for an individual user.
    var data = req.params.id;
    var userid = req.user.id;

    LogTestModel
    .findOne({
        where: { id: data, owner: userid }
    }).then(
        function findOneSuccess(data){
            res.json(data);
        },
        function findOneError(err){
            res.send(500, err.message)
        }
    );
});
router.put('/:id', function(req, res){ //Allows individual to be updated by a user.
    var data = req.body.logtestdata.item;
    var result = req.body.logtestdata.result;
    console.log(result)
    LogTestModel
        .update({ 
            description: data,
            result: result
        },
        {where: {id: req.params.id}}
    ).then(
        function updateSuccess(updatedLog){
            console.log(updatedLog)
            res.json({
                description: data,
                result: result
            });
        },
        function updateError(err){
            res.send(500, err.message);
        }
    )

});
router.delete('/:id', function(req, res){ //Allows individual logs to be deleted by a user.
    var data = req.params.id;
    var userid = req.user.id;

    LogTestModel
    .destroy({
        where: { id: data, owner: userid }
    }).then(
        function deleteLogSuccess(data){
            res.send('You removed a log');
        },
        function deleteLogError(err){
            res.send(500, err.message);
        }
    );
});

module.exports = router;