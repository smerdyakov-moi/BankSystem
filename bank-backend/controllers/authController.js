const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const adminModel = require('../models/adminModel');
const notallowedModel = require ('../models/notallowedModel');
const { generateUserToken, generateAdminToken } = require('../utils/tokenregistration');

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  const accountNumber = Math.floor(100000000 + Math.random() * 900000000);
  let balance = 0;

  if (await userModel.findOne({ email })) {
    return res.status(400).send('User already exists');
  }
  if (await userModel.findOne({ accountNumber })) {
    return res.status(500).send('Please try again!!');
  }
  try {
    const hash_pw = await bcrypt.hash(password, 10);
    await userModel.create({ name, email, password: hash_pw, accountNumber, balance });
    res.send('User successfully created');
  } catch (err) {
    console.error(err);
    res.status(500).send('User creation failed');
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) return res.status(400).send('No user with such email');

  const result = await bcrypt.compare(password, user.password);
  if (!result) return res.status(400).send('Incorrect credentials');

  const token = generateUserToken({ email, userid: user._id });

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 3600000,
    secure: true,
    sameSite: 'none',
    path: '/'
  });

  res.json('User logged in successfully');
};

const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/'
  }).json('User logged out successfully');
};

const createAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (await notallowedModel.findOne({ email })) {
    return res.send('WARNING!!! YOU ARE NOT ALLOWED!!!');
  }

  if (await adminModel.findOne({ email })) {
    return res.send('ERROR');
  }

  try {
    const hash_pw = await bcrypt.hash(password, 10);
    await adminModel.create({ email, password: hash_pw, permission: false });
    res.send('Account created. Check to see whether you are allowed or not. (If you are not allowed once, do not attempt again! Necessary actions will be taken otherwise.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Admin creation failed');
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (await notallowedModel.findOne({ email })) {
    return res.send('WARNING!!! YOU ARE NOT ALLOWED!!!');
  }

  const admin = await adminModel.findOne({ email });

  if (!admin) return res.status(400).json("You haven't attempted to access admin privileges.");
  if (!admin.permission) return res.send('You are currently not allowed admin privileges');

  const result = await bcrypt.compare(password, admin.password);
  if (!result) return res.status(400).json('Incorrect credentials');

  const token = generateAdminToken({ email, adminid: admin._id });

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 3600000,
    secure: true,
    sameSite: 'none',
    path: '/'
  });

  res.json('Admin logged in successfully');
};

const logoutAdmin = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/'
  }).json('Admin logged out successfully');
};

const permissionAdmin = async (req, res) => {
  if (req.admin.email !== 'admin-1@gmail.com') return res.send('You are not allowed to give permissions');

  const { email, permission } = req.body;
  const decision = await adminModel.findOne({ email });

  if (permission) {
    decision.permission = true;
    await decision.save();
    return res.send(`${email} allowed admin privileges`);
  } else {
    await notallowedModel.create({ email });
    await adminModel.findOneAndDelete({ email });
    return res.send(`${email} not allowed admin privileges`);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  createAdmin,
  loginAdmin,
  logoutAdmin,
  permissionAdmin
};
