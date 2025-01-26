const express = require('express');
const { check } = require('express-validator');

const ingredientsControllers = require("../controllers/ingredients-controllers")
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get("/:pid", ingredientsControllers.getIngredientById);
router.get("/user/:uid", ingredientsControllers.getIngredientsByUserId);

router.use(checkAuth);

router.post(
    "/", 
    fileUpload.single('image'),
    [
        check('name').not().isEmpty(),
        check('description').isLength({min: 5}),
    ],
    ingredientsControllers.createIngredient
);

router.patch(
    "/:pid",
    [
        check('name').not().isEmpty(),
        check('description').isLength({min: 5}),
    ],
    ingredientsControllers.editIngredient
);

router.delete("/:pid", ingredientsControllers.deleteIngredient);

module.exports = router;