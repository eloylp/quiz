var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz Server V1.0', errors: [] });
});

router.param('quizId', quizController.load); // autoload

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/random', quizController.random);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.delete);


router.get('/author', function(req, res){
  res.render('author', {errors: []});
});

module.exports = router;
