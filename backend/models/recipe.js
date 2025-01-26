const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name:           { type: String, required: true },
    description:    { type: String, required: true },
    image:          { type: String, required: true },
    creator:        { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
})

recipeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Recipe', recipeSchema);
