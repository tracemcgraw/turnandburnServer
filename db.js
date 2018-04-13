var Sequelize = require('sequelize');

var sequelize = new Sequelize('turnandburn', 'postgres', 'Vegan123*',{
    host: 'localhost',
    dialect: 'postgres'

});

sequelize.authenticate().then(
    function(){
        console.log('We are connected to Postgress Database!');
    },
    function(err){
        console.log(err);
    }
)
module.exports = sequelize;