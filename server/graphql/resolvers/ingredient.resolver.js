const Ingredient = require('../../models/ingredient.model')
const Processing = require('../../models/processing.model')
const ProcessingName = require('../../models/processingName.model')
const Unit = require('../../models/unit.model')
const Station = require('../../models/station.model')
const Packaging = require('../../models/packaging.model')
const LabelTemplate = require('../../models/labelTemplate.model')
const SupplierItem = require('../../models/item.model')
const Sachet = require('../../models/sachet.model')

module.exports = {
   ingredients: async () => {
      try {
         const ingredients = await Ingredient.find()
         return ingredients
      } catch (err) {
         throw err
      }
   },
   ingredient: async args => {
      try {
         const ingredient = await Ingredient.findOne({ _id: args.id })
         return ingredient
      } catch (err) {
         throw err
      }
   },
   processings: async args => {
      try {
         const ingredient = await Ingredient.findOne({
            _id: args.ingredientId
         }).populate({
            path: 'processings',
            populate: {
               path: 'name'
            }
         })
         return ingredient.processings
      } catch (err) {
         throw err
      }
   },
   sachets: async args => {
      try {
         const processing = await Processing.findOne({
            _id: args.processingId
         }).populate({
            path: 'sachets',
            populate: [
               {
                  path: 'quantity.unit'
               },
               {
                  path: 'modes.station'
               },
               {
                  path: 'modes.supplierItems',
                  populate: [
                     {
                        path: 'item'
                     },
                     {
                        path: 'packaging'
                     },
                     {
                        path: 'labelTemplate'
                     }
                  ]
               }
            ]
         })
         return processing.sachets
      } catch (err) {
         throw err
      }
   },
   processingNames: async () => {
      try {
         const processingNames = await ProcessingName.find()
         return processingNames
      } catch (err) {
         throw err
      }
   },
   units: async () => {
      try {
         const units = await Unit.find()
         return units
      } catch (err) {
         throw err
      }
   },
   stations: async () => {
      try {
         const stations = await Station.find()
         return stations
      } catch (err) {
         throw err
      }
   },
   supplierItems: async () => {
      try {
         const supplierItems = await SupplierItem.find()
         return supplierItems
      } catch (err) {
         throw err
      }
   },
   packagings: async () => {
      try {
         const packagings = await Packaging.find()
         return packagings
      } catch (err) {
         throw err
      }
   },
   labelTemplates: async () => {
      try {
         const templates = LabelTemplate.find()
         return templates
      } catch (err) {
         throw err
      }
   },
   createIngredient: async args => {
      try {
         const ingredient = new Ingredient({
            name: args.input.name
         })
         const doc = await ingredient.save()
         return doc
      } catch (err) {
         throw err
      }
   },
   updateIngredient: async args => {
      try {
         const ingredient = await Ingredient.findByIdAndUpdate(
            { _id: args.input.ingredientId },
            {
               $set: {
                  name: args.input.name,
                  image: args.input.image
               }
            },
            {
               new: true
            }
         )
         return ingredient
      } catch (err) {
         throw err
      }
   },
   addProcessings: async args => {
      try {
         const processings = await args.input.processingNames.map(
            processingName => {
               const processing = new Processing({
                  name: processingName
                  // sachets: []
               })
               processing.save()
               return processing._id
            }
         )
         const ingredient = await Ingredient.findOneAndUpdate(
            {
               _id: args.input.ingredientId
            },
            {
               $push: {
                  processings: { $each: processings }
               }
            },
            {
               new: true
            }
         ).populate({
            path: 'processings',
            populate: {
               path: 'name'
            }
         })
         return ingredient.processings
      } catch (err) {
         throw err
      }
   },
   deleteProcessing: async args => {
      try {
         // This will be done using pre hook later
         const processing = await Processing.findOne({
            _id: args.input.processingId
         })
         await Sachet.deleteMany({
            _id: { $in: processing.sachets }
         })
         await processing.remove()
         await Ingredient.findOneAndUpdate(
            {
               _id: args.input.ingredientId
            },
            {
               $pull: {
                  processings: args.input.processingId
               }
            }
         )
         return {
            success: true,
            message: 'Processing deleted!',
            // return id from deleted obj, later
            ID: args.input.processingId
         }
      } catch (err) {
         throw err
      }
   },
   addSachet: async args => {
      try {
         const sachet = await Sachet.create(args.input.sachet)
         const processing = await Processing.findOneAndUpdate(
            {
               _id: args.input.processingId
            },
            {
               $push: {
                  sachets: sachet._id
               }
            },
            {
               new: true
            }
         ).populate({
            path: 'sachets',
            populate: [
               {
                  path: 'quantity.unit'
               },
               {
                  path: 'modes.station'
               },
               {
                  path: 'modes.supplierItems',
                  populate: [
                     {
                        path: 'item'
                     },
                     {
                        path: 'packaging'
                     },
                     {
                        path: 'labelTemplate'
                     }
                  ]
               }
            ]
         })
         await Ingredient.findOneAndUpdate(
            {
               _id: args.input.ingredientId
            },
            {
               $push: {
                  sachets: sachet._id
               }
            }
         )
         return processing.sachets
      } catch (err) {
         throw err
      }
   },
   deleteSachet: async args => {
      try {
         await Sachet.findOneAndDelete({ _id: args.input.sachetId })
         await Ingredient.findOneAndUpdate(
            { _id: args.input.ingredientId },
            {
               $pull: {
                  sachets: args.input.sachetId
               }
            }
         )
         await Processing.findOneAndUpdate(
            { _id: args.input.processingId },
            {
               $pull: {
                  sachets: args.input.sachetId
               }
            }
         )
         return {
            success: true,
            message: 'Sachet removed!',
            ID: args.input.sachetId
         }
      } catch (err) {
         throw err
      }
   }
}
