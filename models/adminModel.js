const mongoose = require ('mongoose')

const adminSchema = mongoose.Schema({
    password: String,
    email: String,
    permission: Boolean
})

module.exports = mongoose.model('admin', adminSchema)