const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
   title: {
      type: String
   }
})

module.exports = mongoose.model('Item', ItemSchema)
