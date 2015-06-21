

module.exports = function(Sequelize, DataTypes){

  return Sequelize.define('Quiz', {
    pregunta: DataTypes.STRING,
    respuesta: DataTypes.STRING
  });

};
