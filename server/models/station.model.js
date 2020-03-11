const mongoose = require('mongoose')

const StationSchema = new mongoose.Schema({
   title: {
      type: String
   }
})

module.exports = mongoose.model('Station', StationSchema)
