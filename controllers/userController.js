const { response } = require('express')
const userModel = require ('../models/userModel')

const sendMoney = async (req,res)=>{
    const {accountNumber,balance} = req.body
    
    let user_receiving = await userModel.findOne({accountNumber})
    let user_sending = await userModel.findOne({email:req.user.email})

    if(user_sending.balance-balance<0){return res.send('Not enough balance')}

    if(accountNumber===user_sending.accountNumber){return res.send("Can't send capital to yourself!!!!")}
    if(balance<=0){ return res.send("Invalid deposit.")}

    

    if(user_sending.balance-balance<0){return res.send("Not enough balance!!")}

    user_sending.moneysent.push({
        sentTo:user_receiving._id,
        money:balance})
    
    user_sending.balance-=balance
    await user_sending.save()

    user_receiving.moneyreceived.push({
        sentBy:user_sending._id,
        money:balance
    })
    user_receiving.balance+=balance
    await user_receiving.save()

    return res.send("Transaction Complete!!")
}

const depositMoney = async (req,res)=>{
    const {balance} = req.body
    if(balance<=0){return res.send("Invalid deposit. Please try again!!")}
    let user_x = await userModel.findOne({email: req.user.email})
    user_x.balance+=balance
    await user_x.save()
    return res.send(`$ ${balance} was successfully deposited!! Current Balance:$ ${user_x.balance}`)
}

const withdrawMoney = async (req,res)=>{
    const {balance} = req.body
    let user_x = await userModel.findOne({email:req.user.email})
    if(user_x.balance-balance<0){return res.send("Not enough capital in account for the required withdrawal!!")}
    user_x.balance-=balance
    await user_x.save()
    return res.send(`$ ${balance} was successfully withdrawn!! Current Balance: $ ${user_x.balance}`)
}

const accDetails = async(req,res)=>{
    let user_x = await userModel.findOne({email:req.user.email})
    res.send(`Name: ${user_x.name}\n Email: ${user_x.email}\n Account: ${user_x.accountNumber}\n Balance: $ ${user_x.balance}`)
}

const accHistory = async(req,res)=>{
    let user_x = await userModel.findOne({email:req.user.email}).populate('moneysent.sentTo').populate('moneyreceived.sentBy')
    
    output="Sent To:\n\n"

    if(user_x.moneysent.length>0){
    user_x.moneysent.forEach((details)=>{
        output=output+String(details.sentTo.name)+"($ "+String(details.money)+")"+"\n"
        
    })}

    output+="\n\n"
    output+="Received Money From:\n\n"

    if(user_x.moneyreceived.length>0){
    user_x.moneyreceived.forEach((details)=>{
        output=output+String(details.sentBy.name)+"($ "+String(details.money)+")" + "\n"
    })}

    return res.send(output)
}

module.exports ={
    sendMoney,depositMoney,withdrawMoney,accDetails,accHistory
}