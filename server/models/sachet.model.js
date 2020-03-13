const mongoose = require('mongoose')

const SachetSchema = new mongoose.Schema({
   isValid: {
      type: Boolean,
      default: false
   },
   quantity: {
      value: {
         type: Number,
         required: ['Quantity is required for a sachet.']
      },
      unit: {
         type: String,
         required: ['Quantity unit is required for storing quantity.']
      }
   },
   tracking: {
      type: Boolean,
      required: ['Tracking value is required.']
   },
   modes: [
      {
         isActive: {
            type: Boolean,
            default: false
         },
         priority: {
            type: Number
         },
         type: {
            type: String,
            enum: ['Real Time', 'Co-Packer', 'Planned Lot'],
            required: ['Mode of fulfillment is required for a sachet.'],
            default: 'Real Time'
         },
         station: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Station',
            required: ['Station is required for a sachet.']
         },
         supplierItems: [
            {
               isDefault: {
                  type: Boolean,
                  default: false
               },
               item: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Item'
               },
               isWeighable: {
                  type: Boolean,
                  default: true
               },
               accuracy: {
                  type: Number,
                  required: ['Accuracy is required for a sachet.']
               },
               packaging: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Packaging',
                  required: ['Packaging type is required for a sachet.']
               },
               isLabelled: {
                  type: Boolean,
                  default: false
               },
               labelTemplate: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'LabelTemplate',
                  required: ['Label template is required for a sachet.']
               }
            }
         ]
      }
   ]
})

module.exports = mongoose.model('Sachet', SachetSchema)
