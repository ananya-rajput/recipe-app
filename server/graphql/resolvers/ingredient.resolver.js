const Ingredient = require('../../models/ingredient.model');
const Processing = require('../../models/processing.model');
const Sachet = require('../../models/sachet.model');

module.exports = {
    ingredients: async () => {
        try {
            const ingredients = await Ingredient.find();
            return ingredients;
        } catch(err) {
            throw err;
        }
    },
    createIngredient: async (args) => {
        try {
            const ingredient = new Ingredient({
                name : args.input.name
            });
            const doc = await ingredient.save();
            return doc;
        } catch(err) {
            throw err;
        }
    }
}