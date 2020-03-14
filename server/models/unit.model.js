const mongoose = require('mongoose')

const UnitSchema = new mongoose.Schema({
   title: {
      type: String
   }
})

module.exports = mongoose.model('Unit', UnitSchema)
