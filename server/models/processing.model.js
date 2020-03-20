const mongoose = require('mongoose')
const Sachet = require('./sachet.model')

const ProcessingSchema = new mongoose.Schema(
   {
      isValid: {
         type: Boolean,
         default: false
      },
      name: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'ProcessingName'
      },
      sachets: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sachet'
         }
      ],
      recipes: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
         }
      ]
   },
   {
      timestamps: true
   }
)

// This hook doesn't work rn
// ProcessingSchema.pre('remove', async function(next) {
//    console.log('Working')
//    await Sachet.deleteMany({ _id: { $in: this.sachets } })
//    next()
// })

module.exports = mongoose.model('Processing', ProcessingSchema)
