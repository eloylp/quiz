

module.exports = function(Sequelize, DataTypes){

  return Sequelize.define('Comment', {
    texto: {
      type: DataTypes.STRING,
      validate: { notEmpty: {msg: "-> Falta comentario."}}
    },
    publicado:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

};
