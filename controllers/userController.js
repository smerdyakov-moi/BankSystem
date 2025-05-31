const { response } = require('express')
const userModel = require ('../models/userModel')
const deletedUser = require ('../models/deletedUser')
const bcrypt = require ('bcrypt')

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

const accHistory = async (req, res) => {
  try {
    const user_x = await userModel
      .findOne({ email: req.user.email })
      .populate('moneysent.sentTo')
      .populate('moneyreceived.sentBy')

    let output = "Sent To:\n\n";

      for (const details of user_x.moneysent) {
        if (details.sentTo && details.sentTo.name) {
          output += `${details.sentTo.name} ($${details.money})\n`
        } else {
          output += `Unknown recipient ($${details.money})\n`
        }
      }
    
    output += "\n\nReceived Money From:\n\n";

    
      for (const details of user_x.moneyreceived) {
        
        if (details.sentBy && details.sentBy.name) {
          output += `${details.sentBy.name} ($${details.money})\n`
        } else {
          output += `Unknown sender ($${details.money})\n`
        }
      }
    
    
    return res.send(output);
  } catch (err) {
    console.error("Account history error:", err)
    return res.status(500).send("Error generating account history")
  }
}
//Logic for when closing account, still be able to see history of user that interacted with that user


const closeAcc = async(req,res)=>{
    let deleted_user = await userModel.findOneAndDelete({email:req.user.email})
    const {name,email,password,accountNumber,balance,moneysent,moneyreceived,_id} = deleted_user
    await deletedUser.create({
        name,email,password,accountNumber,balance,moneysent,moneyreceived,_id
    })

    return res.send("The account has been closed.")
}

const recoverAcc = async (req,res)=>{ //Recovering Account
    const {email,password} = req.body
    if(await userModel.findOne({email})){return res.send("Account has not been closed")}
    if(! await deletedUser.findOne({email})){return res.send("Does not exist!!")}

    user = await deletedUser.findOne({email})
    await deletedUser.findOneAndDelete({email})
    const result = await bcrypt.compare(password, user.password)
    if(!result){return res.send.json("Incorrect creds!")}

    //return res.send(user)
    await userModel.create({_id:user._id,name:user.name,email:user.email,password:user.password,accountNumber:user.accountNumber,balance:user.balance,moneysent:user.moneysent,moneyreceived:user.moneyreceived})
    res.send("Your account has been successfully restored. You can proceed to login!!")
  }

module.exports ={
    sendMoney,depositMoney,withdrawMoney,accDetails,accHistory,closeAcc,recoverAcc
}