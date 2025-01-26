const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name:           { type: String, required: true },
    description:    { type: String, required: true },
    image:          { type: String, required: true },
    creator:        { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
})

ingredientSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Ingredient', ingredientSchema);
