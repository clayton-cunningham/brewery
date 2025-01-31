const express = require('express');
const { check } = require('express-validator');

const inventorysControllers = require("../controllers/inventory-controllers")
const checkAuth = require('../middleware/check-auth');
const HttpError = require('../models/http-error');

const router = express.Router();


router.use(checkAuth);

router.get("/:uid/:iid", inventorysControllers.getInventoryById);

router.patch(
    "/:uid/:iid",
    [
        // Inventory should be: { slot: number, count: number, ingredientId: number }[], where all "slot" values are unique
        check('inventory').not().isEmpty().isArray().custom(value => {

            const slotValues = new Set(); // To track unique slot indices

            // Check each item in the array
            for (const item of value) {
                if (typeof item !== 'object' || !item.hasOwnProperty('slot') || !item.hasOwnProperty('count') || !item.hasOwnProperty('ingredientId')) {
                    throw new Error('Each item in inventory must have slot, count and ingredientId properties');
                }
                if (typeof item.slot !== 'number') {
                    throw new Error('Property slot must be a number');
                }
                if (typeof item.count !== 'number') {
                    throw new Error('Property count must be a number');
                }
                if (typeof item.ingredientId !== 'number') {
                    throw new Error('Property ingredientId must be a number');
                }

                // Check for uniqueness of "slot"
                if (slotValues.has(item.slot)) {
                    throw new Error(`Property slot must be unique, but "${item.slot}" is duplicated`);
                }
                slotValues.add(item.slot); // Add the value to the set
            }
            return true;
        }),
    ],
    inventorysControllers.editInventory
);

// TODO: delete

module.exports = router;