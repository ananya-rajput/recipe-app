const Ingredient = require('../../models/ingredient.model')
const Processing = require('../../models/processing.model')
const ProcessingName = require('../../models/processingName.model')
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
   processingNames: async () => {
      try {
         const processingNames = await ProcessingName.find()
         return processingNames
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
