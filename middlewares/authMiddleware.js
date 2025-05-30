const jwt = require('jsonwebtoken')
const {verifyUserToken,verifyAdminToken} = require('../utils/tokenregistration')

const isLoggedin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send('Token missing');
  try {
    const user = verifyUserToken(token);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).send('Invalid token');
  }
};

const isAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send('Token missing');
  try {
    const admin = verifyAdminToken(token);
    req.admin = admin;
    next();
  } catch (err) {
    res.status(403).send('Unauthorized access');
  }
};

module.exports = { isLoggedin, isAdmin };