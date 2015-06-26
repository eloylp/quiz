

module.exports = function(Sequelize, DataTypes){

  return Sequelize.define('Quiz', {
    pregunta: {
      type: DataTypes.STRING,
      validate: { notEmpty: {msg: "Falta la pregunta."}}
    },
    respuesta:{
      type: DataTypes.STRING,
      validate: {notEmpty: {msg: "Falta la respuesta."}}

    },
    tematica:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "-> Seleccione un tema."},
        isIn: {
          args: [['ocio', 'tecnologia', 'humanidades', 'otro', 'ciencia']],
          msg: "Seleccione un tema."
        }
      }
    }
  });

};
