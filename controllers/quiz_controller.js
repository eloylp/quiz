var models = require('../models/models');

exports.load = function(req, res, next, quizId){

  models.Quiz.find(quizId).then(function(quiz){
    if(quiz){
      req.quiz = quiz;
      next();
    } else {
      next(new error('No existe quizId=' + quizId));
    }
  }).catch(function(error){next(error);});

};

exports.index = function(req, res){

  var searchu = req.params.quidId;
  var where = searchu ? {where:["pregunta like ?", ('%' + searchu.replace(/\s/g, '%') + '%').replace(/%{2,}/g, '%')]} : '' ;
  console.log(where);
  models.Quiz.findAll(where).then(function(quizes){
    res.render('quizes/index', {
      quizes: quizes,
      searched: searchu
    });
  });
};

exports.show = function(req, res){

    res.render("quizes/show", req.quiz);
}

exports.answer = function(req, res){

  var quiz = req.quiz;

  if(quiz){

    quiz.userResponse = req.query.response;

    if(quiz.respuesta.toLowerCase() == req.query.response.toLowerCase()){

      quiz.style = 'green';
      quiz.responseMessage = 'Respuesta correcta !';

    }else{

      quiz.style = 'red';
      quiz.responseMessage = 'Respuesta incorrecta !';
    }

    res.render("quizes/answer", quiz);

  }else{

    res.status(500);
    res.render('error', {
      message: "Quiz server 1.0 no lo sabe todo ...",
      error : {
        status:'',
        stack: ''
      }

    });
  };
};

exports.random = function(req, res){

  models.Quiz.findAll(function(quizes){

    var quiz = quizes[Math.floor(Math.random()*quizes.length)];
    res.render("quizes/show", quiz);

  });
}
