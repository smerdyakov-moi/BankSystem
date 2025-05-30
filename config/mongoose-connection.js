const mongoose = require ('mongoose')
const config = require ('config')
const dbgr = require ('debug')('development:mongoose')


mongoose.connect(`${config.get("MONGODB_URI")}/BankSystem`).then(function(){dbgr("Connected")}).catch(function(err){console.log(err)})
module.exports = mongoose.connection