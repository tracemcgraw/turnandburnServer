module.exports = function(sequelize, DataTypes){
    return sequelize.define('log',{
        description: DataTypes.STRING,
        result: DataTypes.STRING,
        def: DataTypes.STRING,
        owner: DataTypes.INTEGER

    });
};