const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const inventorySlotSchema = new Schema({
    slot:               { type: Number, required: true },
    count:              { type: Number, required: true },
    user:               { type: mongoose.Types.ObjectId, required: true, index: true, ref: 'User' },
    userInventoryId:    { type: Number, required: true, index: true },
    // ingredient:         { type: mongoose.Types.ObjectId, required: false, index: true, ref: 'Ingredient' },
    ingredientId:       { type: String, required: false },
})

inventorySlotSchema.plugin(uniqueValidator);

module.exports = mongoose.model('InventorySlot', inventorySlotSchema);
