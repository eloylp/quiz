var models = require('../models/models');

exports.load = function(req, res, next, quizId){

  models.Quiz.find({
    where: {id: Number(quizId)},
    include: [{model: models.Comment}]
  }).then(function(quiz){
    if(quiz){
      req.quiz = quiz;
      next();
    } else {
      next(new error('No existe quizId=' + quizId));
    }
  }).catch(function(error){next(error);});

};


exports.index = function(req, res){

  var searchu = req.query.search;
  var where = searchu ? {where:["pregunta like ?", ('%' + searchu.replace(/\s/g, '%') + '%').replace(/%{2,}/g, '%')]} : '' ;
  models.Quiz.findAll(where).then(function(quizes){
    res.render('quizes/index', {
      quizes: quizes,
      searched: searchu,
      errors: []
    });
  });
};

exports.show = function(req, res){

    res.render("quizes/show", {quiz: req.quiz, errors: []});
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

    res.render("quizes/answer", {quiz: quiz, errors: []});

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

  models.Quiz.findAll().then(function(quizes){

    var quiz = quizes[Math.floor(Math.random()*quizes.length)];
    res.render("quizes/show", {quiz:quiz, errors: []});

  });
}

exports.new = function(req , res){

  var quiz = models.Quiz.build({
    pregunta: "Pregunta",
    respuesta: "respuesta",
    tematica:""
    });

  res.render("quizes/new", {quiz: quiz, errors: []});
}

exports.create = function(req, res){

  var quiz = models.Quiz.build(req.body.quiz);

  quiz.validate().then(function(err){
    if(err){
      res.render("quizes/new", {quiz: quiz, errors: err.errors});
    }else{
      quiz.save({fields: ["pregunta", "respuesta", "tematica"]}).
      then(function(){ res.redirect("/quizes")});
    }
  });

}

exports.edit = function(req, res){

  var quiz = req.quiz;
  res.render("quizes/edit", {quiz: quiz, errors: []});

}

exports.update = function(req, res){

  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tematica = req.body.quiz.tematica;

  req.quiz.validate().then(function(err){

    if(err){

      res.render("quizes/edit", {quiz: req.quiz, errors: err.errors});

    }else{

      req.quiz.save({fields: ['pregunta', 'respuesta', 'tematica']}).
      then(function(){
        res.redirect('/quizes');
      });
    }
  });
}

exports.delete = function(req, res){

  req.quiz.destroy().then(function(){

    res.redirect('/quizes');

  }).catch(function(error){next(error)});
}


exports.statistics = function(req, res){

  models.Quiz.findAll({
    include: [{model: models.Comment}]
  }).then(function(quizes){

    var statistics = {}
    statistics.questions = quizes.length;
    statistics.comments = 0;
    statistics.questionsWithOutComments = 0;
    statistics.questionsWithComments = 0;
    statistics.commentsRatio = 0;

    quizes.forEach(function(q){
      if(q.Comments.length === 0){
        statistics.questionsWithOutComments++;
      }else{
        statistics.questionsWithComments++;
      }
      statistics.comments += q.Comments.length;
    });
    statistics.commentsRatio = (statistics.comments / statistics.questions).toFixed(2);
    res.render('quizes/statistics', {statistics: statistics, errors: []});
  });
}
