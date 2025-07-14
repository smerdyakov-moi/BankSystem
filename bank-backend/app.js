const express = require ('express')
const db = require ('./config/mongoose-connection')
const cookieParser = require('cookie-parser')
const adminModel = require ('./models/adminModel')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 3000

app.use(cors({ origin: 'https://banksystem-frontend.onrender.com', credentials: true }))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const authRoutes = require ('./routes/authroutes')
const actionRoutes = require ('./routes/actionroutes')
const userRoutes = require ('./routes/userroutes')

app.use('/',authRoutes)
app.use('/',actionRoutes)
app.use('/',userRoutes)



app.listen(port,()=>{console.log(`Listening on port ${port}!!`)})