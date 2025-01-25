const query = require('../models/apiquery')
const customError = require('../utils/customError')

async function getArticles(req,res){
    const result = await query.getArticles();
    res.send(result)
}

async function getArticleById(req,res){
    const id = req.params.id;
    const result = await query.getArticleById(id);
    res.send(result)
}


async function getCommentsByArticleId(req,res){
    const id = req.params.id;
    const result = await query.getCommentsByArticleId(id);
    res.send(result)
}

async function createPost(req,res){
    
    const result = await query.createPost(req.body,req.userId);

    res.send(result)
}

async function updatePost(req,res,next){
    const id = req.params.id;
    const post = await query.getArticleById(id);
    if (!post) {
        return next(new customError("Post not found",404))
    }
    const authorId = await query.getAuthorId(id);
    const {userId} = req;
    if (authorId !== userId) {
        return next(new customError("Unauthorized",401))
    }

    const result = await query.updatedPost(id,req.body);
    res.send(result)
}

async function deletePost(req,res){
    const id = req.params.id;
    const post = await query.getArticleById(id);
    if (!post) {
        return next(new customError("Post not found",404))
    }
    const result = await query.deletePost(id);
    res.send(result)
}

async function createComment(req,res){
    const id = req.params.id;
    const result = await query.createComment(id,req.userId,req.body.content);
    res.send(result)
    
}

async function updateComment(req,res,next){
    const commentId = req.params.commentId;
    const comment = await query.getCommentById(commentId);
    const data = req.body.content
    if (!comment) {
        return next(new customError("Comment not found",404))
    }
    if (comment.userId !== req.userId) {
        return next(new customError("Unauthorized",401))
    }
    const result = await query.updateComment(commentId,data)
    res.send(result)
}

async function deleteComment(req,res,next) {
    const commentId = req.params.commentId;
    const comment = await query.getCommentById(commentId);
    if (!comment) {
        return next(new customError("Comment not found",404))
    }
    if (comment.userId !== req.userId) {
        return next(new customError("Unauthorized",401))
    }
    const result = await query.deleteComment(commentId);
    res.send(result)
}

module.exports = {
    getArticles,
    getArticleById,
    getCommentsByArticleId,
    createPost,
    updatePost,
    deletePost,
    createComment,
    deleteComment,
    updateComment
}
