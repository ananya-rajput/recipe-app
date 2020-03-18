const mongoose = require('mongoose')

const IngredientSchema = new mongoose.Schema(
   {
      isValid: {
         type: Boolean,
         default: false
      },
      isPublished: {
         type: Boolean,
         default: false
      },
      name: {
         type: String,
         required: ['Ingredient name is required.']
      },
      image: {
         type: String
      },
      processings: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Processing'
         }
      ],
      sachets: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sachet'
         }
      ]
   },
   {
      timestamps: true
   }
)

module.exports = mongoose.model('Ingredient', IngredientSchema)
