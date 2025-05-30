const userModel = require ('../models/userModel')
const adminModel = require('../models/adminModel')

const viewUsers = async (req,res)=>{
    try{let users = await userModel.find()
    data=""
    users.forEach((user)=>{
        data+=(`${user.email}    ${user.name}     ${user.accountNumber} has  $ ${user.balance}`)+"\n"
    })
    res.send(data)
}
    catch(err){
        console.error(err)
        res.status(500).send('Server Error')
    }
}



module.exports={
    viewUsers
}