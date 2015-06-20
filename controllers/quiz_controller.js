
var title = ''

exports.question = function(req, res){


  var questionsRel = [

    {"key": "qrom", "question": "¿ Cuál es la capital de Italia ?", "expected": "Roma"},
    {"key": "qpor", "question": "¿ Cuál es la capital de Portugal ?", "expected": "Lisboa"},
    {"key": "qnode", "question": "¿ Cuál es el futuro de la WEB ?", "expected": "nodejs"}

  ];

  var actualQuestion = questionsRel[Math.floor(Math.random()*questionsRel.length)];




}

exports.answer = function(req, res){



}
