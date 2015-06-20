
// Lo siento , no puedo evitarlo. Hagamoslo mas interesante con un
// array de preguntas. Simplemente añade el objeto correspondiente para mas preguntas !!

var questionsRel = [

  {"key": "qrom", "question": "¿ Cuál es la capital de Italia ?", "expected": "Roma"},
  {"key": "qpor", "question": "¿ Cuál es la capital de Portugal ?", "expected": "Lisboa"},
  {"key": "qnode", "question": "¿ Cuál es el futuro de la WEB ?", "expected": "nodejs"}

];

exports.question = function(req, res){

  var actualQuestion = questionsRel[Math.floor(Math.random()*questionsRel.length)];
  res.render("quizes/question", actualQuestion);
}

exports.answer = function(req, res){

  var question;
  for (var q in questionsRel){

    if(questionsRel[q].key == req.query.key){
      question = questionsRel[q];
      break;
    }else{
      question = false;
    }
  }
  /// Error si no reconocemos la pregunta.
  if(!question){
    res.status(500);
    res.render('error', {
      message: "Quiz server 1.0 no lo sabe todo ...",
      error : {
        status:'',
        stack: ''
      }

    });
  }

  question.userResponse = req.query.response;

  if(question.expected.toLowerCase() == req.query.response.toLowerCase()){

    question.style = 'green';
    question.responseMessage = 'Respuesta correcta !';

  }else{

    question.style = 'red';
    question.responseMessage = 'Respuesta incorrecta !';
  }

  res.render("quizes/answer", question);

}
