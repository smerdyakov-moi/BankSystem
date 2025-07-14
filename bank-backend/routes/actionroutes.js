const express = require ('express')
const router = express.Router()

const {isAdmin} = require('../middlewares/authMiddleware')

const {
    viewUsers
} = require ('../controllers/adminController')


router.get ('/viewallusers', isAdmin,viewUsers)

module.exports = router

