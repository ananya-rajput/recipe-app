const Ingredient = require('../../models/ingredient.model')
const Processing = require('../../models/processing.model')
const ProcessingName = require('../../models/processingName.model')
const Station = require('../../models/station.model')
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
         console.log(ingredient)
         return ingredient
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
         const ingredient = await Ingredient.findOne({
            _id: args.input.ingredientId
         })
         if (!ingredient) {
            throw Error('No ingredient found!')
         }
         const processings = await args.input.processingNames.map(
            processingName => {
               const processing = new Processing({
                  name: processingName,
                  sachets: []
               })
               processing.save()
               return processing._id
            }
         )
         ingredient.processings.push(...processings)
         await ingredient.save()
         const updatedIngredient = await Ingredient.findOne({
            _id: args.input.ingredientId
         }).populate({
            path: 'processings',
            populate: {
               path: 'name'
            }
         })
         console.log(updatedIngredient)
         return updatedIngredient
      } catch (err) {
         throw err
      }
   }
}
