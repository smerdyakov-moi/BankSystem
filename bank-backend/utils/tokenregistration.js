const jwt = require ('jsonwebtoken')
require ('dotenv').config()

const generateUserToken= (usercred) =>{
    return jwt.sign(usercred,process.env.JWT_USER_KEY)
}

const generateAdminToken = (admincred) => {
    return jwt.sign (admincred,process.env.JWT_ADMIN_KEY)
}

const verifyUserToken = (token)=>{
    return jwt.verify(token, process.env.JWT_USER_KEY)
}

const verifyAdminToken = (token) =>{
    return jwt.verify (token, process.env.JWT_ADMIN_KEY)
}

module.exports ={
    generateUserToken,generateAdminToken,verifyUserToken, verifyAdminToken
}