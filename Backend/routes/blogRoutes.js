const route = require('express').Router();
const apiController = require('../controllers/apiController');
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth').verifyJwtToken;
const formValidator = require('../middleware/validateData');

route.get('/posts', apiController.getArticles);
route.get('/posts/:id', apiController.getArticleById);
route.post('/posts', auth, formValidator.postValidation, apiController.createPost);
route.put('/posts/:id', auth, formValidator.postValidation, apiController.updatePost);
route.delete('/posts/:id', auth, apiController.deletePost);



route.get('/posts/:id/comments', apiController.getCommentsByArticleId);
route.post('/posts/:id/comments', auth,formValidator.commentValidation ,apiController.createComment);
route.put('/posts/:id/comment/:commentId', auth, apiController.updateComment)
route.delete('/posts/:id/comment/:commentId', auth, apiController.deleteComment);


route.get('/admin/posts', auth, adminController.getUserAllPost)
route.get('/admin/posts/:id', auth, adminController.getArticleByAuthor)
route.delete('/admin/posts/:id/comment/:commentId', auth, adminController.deleteCommentByAuthor);
module.exports = route;
