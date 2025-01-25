const prisma = require('../db/prismaClient');


async function createPost(data, userId) {
    const result = await prisma.post.create({
        data: {
            title: data.title,
            content: data.content,
            isPublished: false,
            authorId: userId

        }
    })
    return result;

}

async function getArticles() {
    const result = await prisma.post.findMany({
        where: { isPublished: true },
        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            author: {
                select: {
                    username: true,
                }
            },
            comments: {
                select: {
                    content: true,
                    createdAt: true,
                },
            },
        },
    });
    return result;
}

async function getArticleById(id) {
    const result = await prisma.post.findFirst({
        where: {
            AND: [
                { id: id },
                { isPublished: true }
            ]
        },

        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            author: {
                select: {
                    username: true,
                }
            }
        },
    });
    return result;
}

async function getAllArticlesByAuthor(id) {
    const result = await prisma.user.findFirst({
        where: {
            id: id
        },
        select: {
            posts: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    createdAt: true,
                    comments: {
                        select: {
                            id: true,
                        },
                    },
                },
            }
        }
    });
    return result.posts;
}

async function getArticleByAuthor(postId, userId) {
    const result = await prisma.post.findFirst({
        where: {
            AND: [
                { id: postId },
                { authorId: userId }
            ]
        }
    })
    return result;
}

async function getCommentsByArticleId(id) {
    const result = await prisma.comment.findMany({
        where: {
            postId: id
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
                select: {
                    username: true
                }
            }
        }

    })
    return result;
}


async function updatedPost(id, data) {
    const result = await prisma.post.update({
        where: {
            id: id
        },
        data: {
            title: data.title,
            content: data.content,
            isPublished: data.isPublished === true
        }
    })
    return result;
}

async function deletePost(id) {
    try {
        const result = await prisma.post.delete({
            where: {
                id: id
            }
        })
        return result;
    } catch (error) {
        return (error)
    }
}

async function verifyPostWithUser(postId, userId) {
    const result = await prisma.post.findFirst({
        where: {
            AND: [
                { id: postId },
                { authorId: userId }
            ]
        }
    })
    return result;
}

async function verifyCommentWithPost(postId,commentId) {
    return await prisma.post.findFirst(
        {
            where:{id:postId}
        }
    )
}

async function togglePublishPost(id) {
    const post = await prisma.post.update({
        where: { id },
        data: { isPublished: !post.isPublished },
    });
    return post;

}

async function getAuthorId(id) {
    const result = await prisma.post.findFirst({
        where: {
            id: id
        },
        select: {
            authorId: true
        }
    })
    return result.authorId;
}

async function createComment(postId, userId, content) {
    return await prisma.comment.create({
        data: {
            content: content,
            postId: postId,
            userId: userId
        },
        include: {
            user: {
                select: {
                    username: true
                }
            }
        }
    })
}

async function getCommentById(id) {
    return await prisma.comment.findFirst({
        where: {
            id: id
        }
    })
}

async function deleteComment(id) {
    return await prisma.comment.delete({
        where: {
            id: id
        }
    })
}

async function deleteCommentByAuthor(commentId) {
    return await prisma.comment.delete({
        where: {
            id: id
        }
    })
}

async function updateComment(id, data) {
    return await prisma.comment.update(
        {
            where: {
                id: id
            },
            data: {
                content: data
            }

        }
    )
}

module.exports = {
    getArticles,
    getAllArticlesByAuthor,
    getArticleByAuthor,
    getArticleById,
    getCommentsByArticleId,
    getCommentById,
    deleteComment,
    deleteCommentByAuthor,
    createComment,
    createPost,
    updatedPost,
    deletePost,
    verifyPostWithUser,
    togglePublishPost,
    getAuthorId,
    updateComment
}
