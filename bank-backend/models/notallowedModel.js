const mongoose = require ('mongoose')

const notadminSchema = mongoose.Schema({
    email:String
})

module.exports = mongoose.model('notadmin', notadminSchema)