const prisma = require('../db/prismaClient');


async function getUserByEmail(email){
    const result = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    return result;
}
 
async function getUserById(id){
    const result = await prisma.user.findUnique({
        where:{
            id:id
        }
    })
    return result;
}

async function createUser(data){
    const result = await prisma.user.create({
        data:{
            username:data.username,
            email:data.email,
            password:data.password
        }
    })
    return result;
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser
}