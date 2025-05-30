const mongoose = require ('mongoose')

const deleteduserSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    accountNumber: Number,
    balance: Number,
    
    moneysent:[{sentTo: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },money:Number}],

    moneyreceived:[{sentBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },money:Number}]
}) 

module.exports = mongoose.model('deleteduser', deleteduserSchema)