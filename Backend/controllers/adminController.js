const query = require('../models/apiquery')
const prisma = require('../db/prismaClient')
const customError = require('../utils/customError')

async function getUserAllPost(req,res,next) {
    const userId = req.userId;
    if(!userId){
        return next(new customError("User not found",404)) 
    }
    const posts = await query.getAllArticlesByAuthor(userId)
    res.send(posts);
}


async function getArticleByAuthor(req,res,next) {
    const userId = req.userId;
    const postId = req.params.id;
    if(!userId){
        return next(new customError("User not found",404)) 
    }
    const post = await query.getArticleByAuthor(postId,userId)
    res.send(post);
    
}

async function deleteCommentByAuthor(req,res,next){
    try {
        const authorId = req.userId; // Assume authorId is retrieved from the authenticated user session or JWT
        const { id, commentId } = req.params;

    
        // Step 1: Verify that the post exists and is authored by the requesting user
        const post = await prisma.post.findUnique({
          where: { id: id },
          select: { authorId: true },
        });
    
        if (!post) {
          return next(new customError("Post not found",404))
        }
    
        if (post.authorId !== authorId) {
          return next(new customError("You are not authorized to delete this comment",401))
        }
    
        // Step 2: Check if the comment exists and is associated with the post
        const comment = await prisma.comment.findUnique({
          where: { id: commentId },
          select: { postId: true },
        });
    
        if (!comment) {
          return res.status(404).json({ error: "Comment not found" });
        }
    
        if (comment.postId !== id) {
          return res.status(401).json({ error: "You are not authorized to delete this comment" });
        }
    
        // Step 3: Delete the comment
        await prisma.comment.delete({
          where: { id: commentId },
        });
    
        res.status(200).json({ message: "Comment deleted successfully" });
      } catch (error) {
        console.error(error);
        return next(new customError("Internal server error",500))
      }
}

module.exports = {
    getUserAllPost,
    getArticleByAuthor,
    deleteCommentByAuthor
}