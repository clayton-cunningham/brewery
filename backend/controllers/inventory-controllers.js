

const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const InventorySlot = require("../models/inventorySlot");
const User = require("../models/user");
const fs = require('fs');
const { default: mongoose } = require("mongoose");

const getInventoryById = async (req, res, next) => {
    const { uid: userId, iid: inventoryId } = req.params;

    let inventorySlots;
    try {
        // Check that user exists
        const user = await User.findById(userId);
        if (!user) { return next(new HttpError("Could not find a user for the provided id.", 404)); }

        inventorySlots = await InventorySlot.find({ user: userId, userInventoryId: inventoryId});
    } catch (e) {
        const error = new HttpError('Failed to access the database, please try again', 500, e);
        return next(error);
    }

    // We can return no results, but we shouldn't see a null response.
    if (!inventorySlots) { return next(new HttpError("Recieved no data in an unexpected format.", 500)); }

    res.json({ inventory: inventorySlots });
}

const editInventory = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError("Invalid input.", 422);
        return next(error);
    }

    const { uid: userId, iid: inventoryId } = req.params;

    let inventorySlotsDB;
    try {
        // Check that user exists
        const user = await User.findById(userId);
        if (!user) { return next(new HttpError("Could not find a user for the provided id.", 404)); }

        inventorySlotsDB = await InventorySlot.find({ user: userId, userInventoryId: inventoryId});
    } catch (e) {
        return next(new HttpError('Failed to access the database, please try again', 500, e));
    }

    // We can return no results, but we shouldn't see a null response.
    if (!inventorySlotsDB) { return next(new HttpError("Recieved no data in an unexpected format.", 500)); }

    const { inventory: inventorySlotsReq } = req.body;

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        
        // Go through each entry in the request
        await inventorySlotsReq.forEach(async slotReq => {
            let slotDB = inventorySlotsDB.find(s => s.slot == slotReq.slot);

            if (slotDB != null) {
                if (slotReq.count == 0) {
                    // Delete entry
                    await slotDB.deleteOne({ session: sess });
                }
                else {
                    // Update entry
                    slotDB.count = slotReq.count;
                    slotDB.ingredientId = slotReq.ingredientId;
                    await slotDB.save({ session: sess });
                }
            }
            else if (slotReq.count == 0) {
                // Do nothing
            }
            else {
                // Create entry
                const createdInventorySlot = new InventorySlot({
                    slot: slotReq.slot,
                    count: slotReq.count,
                    user: userId,
                    userInventoryId: inventoryId,
                    ingredientId: slotReq.ingredientId,
                })
                await createdInventorySlot.save({ session: sess });
            }
        })

        // Commit changes
        await sess.commitTransaction();
    } catch (err) {
        return next(new HttpError('Failed to access the database, please try again', 500, err));
    }

    res.status(204).json({});
}

exports.getInventoryById = getInventoryById;
exports.editInventory = editInventory;