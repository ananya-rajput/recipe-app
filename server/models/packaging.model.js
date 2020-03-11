const mongoose = require('mongoose')

const PackagingSchema = new mongoose.Schema({
   title: {
      type: String
   }
})

module.exports = mongoose.model('Packaging', PackagingSchema)
