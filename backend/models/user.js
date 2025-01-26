const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:          { type: String, required: true, unique: true },
    password:       { type: String, required: true, minLength: 6 },
    name:           { type: String, required: true },
    ingredientInventory: [
        {
            ingredientId:   { type: mongoose.Types.ObjectId, required: true, ref: 'Ingredient' },
            count:          { type: Number, required: true },
        }
    ],
    recipeInventory: [
        {
            recipeId:   { type: mongoose.Types.ObjectId, required: true, ref: 'Recipe' },
            count:      { type: Number, required: true },
        }
    ],
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
