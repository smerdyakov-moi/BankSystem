const { response } = require("express");
const userModel = require("../models/userModel");
const deletedUser = require("../models/deletedUser");
const bcrypt = require("bcrypt");

const sendMoney = async (req, res) => {
  let { accountNumber, balance } = req.body;
  accountNumber = Number(accountNumber);
  balance = Number(balance);

  const user_sending = await userModel.findOne({ email: req.user.email });
  const user_receiving = await userModel.findOne({ accountNumber });

  if (!user_receiving) return res.send("Recipient not found");
  if (user_sending.accountNumber === accountNumber)
    return res.send("Cannot send money to yourself");
  if (balance <= 0) return res.send("Invalid amount");
  if (user_sending.balance < balance) return res.send("Not enough balance");

  user_sending.moneysent.push({
    sentTo: user_receiving._id,
    money: balance,
  });
  user_sending.balance -= balance;
  await user_sending.save();

  user_receiving.moneyreceived.push({
    sentBy: user_sending._id,
    money: balance,
  });
  user_receiving.balance += balance;
  await user_receiving.save();

  res.send("Transaction Complete");
};

const depositMoney = async (req, res) => {
  let balance = Number(req.body.balance);
  if (balance <= 0) return res.send("Invalid deposit");
  const user_x = await userModel.findOne({ email: req.user.email });
  user_x.balance += balance;
  await user_x.save();
  res.send(
    `$${balance} was successfully deposited Current Balance: $${user_x.balance}`
  );
};

const withdrawMoney = async (req, res) => {
  let balance = Number(req.body.balance);
  const user_x = await userModel.findOne({ email: req.user.email });
  if (balance <= 0) return res.send("Invalid withdrawal amount");
  if (user_x.balance < balance) return res.send("Not enough capital");
  user_x.balance -= balance;
  await user_x.save();
  res.send(
    `$${balance} was successfully withdrawn Current Balance: $${user_x.balance}`
  );
};

const accDetails = async (req, res) => {
  const user_x = await userModel.findOne({ email: req.user.email });
  res.send(
    `Name: ${user_x.name}\n Email: ${user_x.email}\n Account: ${user_x.accountNumber}\n Balance: $${user_x.balance}`
  );
};

const accHistory = async (req, res) => {
  try {
    const user_x = await userModel
      .findOne({ email: req.user.email })
      .populate("moneysent.sentTo")
      .populate("moneyreceived.sentBy");

    let output = "Sent To:\n\n";

    for (const details of user_x.moneysent) {
      output += `${details.sentTo?.name || "Unknown"} ($${details.money})\n`;
    }

    output += "\n\nReceived Money From:\n\n";

    for (const details of user_x.moneyreceived) {
      output += `${details.sentBy?.name || "Unknown"} ($${details.money})\n`;
    }

    res.send(output);
  } catch (err) {
    res.status(500).send("Error generating account history");
  }
};

const closeAcc = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: "Password required" });

    const user = await userModel.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    const deleted_user = await userModel.findOneAndDelete({ email: req.user.email });
    if (!deleted_user) {
      return res.status(404).json({ message: "User not found or already deleted" });
    }

    const {
      name,
      email,
      password: hashedPassword,
      accountNumber,
      balance,
      moneysent,
      moneyreceived,
      _id,
    } = deleted_user;

    await deletedUser.create({
      _id,
      name,
      email,
      password: hashedPassword,
      accountNumber,
      balance,
      moneysent,
      moneyreceived,
    });

    res.clearCookie("token", { httpOnly: true, secure: false });
    res.status(200).json({ message: "Account successfully deleted" });
  } catch (err) {
    console.error("Error in closeAcc:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const recoverAcc = async (req, res) => {
  const { email, password } = req.body;
  if (await userModel.findOne({ email }))
    return res.send("Account has not been closed");
  const user = await deletedUser.findOne({ email });
  if (!user) return res.send("Does not exist");
  const result = await bcrypt.compare(password, user.password);
  if (!result) return res.send("Incorrect creds");
  await deletedUser.findOneAndDelete({ email });
  await userModel.create({
    _id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
    accountNumber: user.accountNumber,
    balance: user.balance,
    moneysent: user.moneysent,
    moneyreceived: user.moneyreceived,
  });
  res.send(
    "Your account has been successfully restored You can proceed to login"
  );
};

module.exports = {
  sendMoney,
  depositMoney,
  withdrawMoney,
  accDetails,
  accHistory,
  closeAcc,
  recoverAcc,
};
