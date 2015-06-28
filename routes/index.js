var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller.js');
var commentController = require('../controllers/comment_controller.js');
var sessionController = require('../controllers/session_controller.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz Server V1.0', errors: [] });
});

router.param('quizId', quizController.load); // autoload
router.param('commentId', commentController.load);

/// Login
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);


router.get('/quizes',                        quizController.index);
router.get('/quizes/:quizId(\\d+)',          quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',   quizController.answer);
router.get('/quizes/random',                 quizController.random);
router.get('/quizes/new',                    sessionController.loginRequired, quizController.new);
router.post('/quizes/create',                sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',     sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',          sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',       sessionController.loginRequired, quizController.delete);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',
              sessionController.loginRequired, commentController.publish);

router.get('/author', function(req, res){
  res.render('author', {errors: []});
});

module.exports = router;
