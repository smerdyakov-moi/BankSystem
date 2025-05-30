const express = require ('express')
const db = require ('./config/mongoose-connection')
const cookieParser = require('cookie-parser')
const adminModel = require ('./models/adminModel')

const app = express()

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const authRoutes = require ('./routes/authroutes')
const actionRoutes = require ('./routes/actionroutes')
const userRoutes = require ('./routes/userroutes')

app.use('/',authRoutes)
app.use('/',actionRoutes)
app.use('/',userRoutes)



app.listen('3000',()=>{console.log("Listening on port 3000!!")})