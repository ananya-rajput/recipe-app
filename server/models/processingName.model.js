const mongoose = require('mongoose')

const ProcessingName = new mongoose.Schema(
   {
      title: {
         type: String,
         unique: ['Processing type cannot be duplicated.']
      }
   },
   {
      timestamps: true
   }
)

module.exports = mongoose.model('ProcessingName', ProcessingName)
