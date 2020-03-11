const mongoose = require('mongoose')

const LabelTemplateSchema = new mongoose.Schema({
   title: {
      type: String
   }
})

module.exports = mongoose.model('LabelTemplate', LabelTemplateSchema)
