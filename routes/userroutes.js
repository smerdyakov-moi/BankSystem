const express = require('express')
const router = express.Router()

const {
    sendMoney,depositMoney,
    withdrawMoney,
    accDetails,accHistory,closeAcc
} = require ('../controllers/userController')

const {isLoggedin} = require ('../middlewares/authMiddleware')

router.patch('/sendmoney', isLoggedin,sendMoney)
router.patch ('/depositmoney', isLoggedin,depositMoney)
router.patch('/withdrawmoney',isLoggedin,withdrawMoney)

router.get('/mydetails',isLoggedin,accDetails)
router.get ('/acchistory', isLoggedin,accHistory)

router.delete ('/closeacc', isLoggedin, closeAcc)

module.exports = router
