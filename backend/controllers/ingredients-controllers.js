

const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Ingredient = require("../models/ingredient");
const User = require("../models/user");
const fs = require('fs');
const { default: mongoose } = require("mongoose");

const getIngredientById = async (req, res, next) => {
    const ingredientId = req.params.pid;

    let ingredient;
    try {
        ingredient = await Ingredient.findById(ingredientId);
    } catch (e) {
        const error = new HttpError(
            'Failed to retrieve a ingredient, please try again',
            500
        );
        return next (error);
    }

    if (!ingredient) {
        const error = new HttpError(
            "Could not find a ingredient for the provided id.", 404
        );
        return next (error);
    }

    res.json({ ingredient: ingredient.toObject({ getters: true }) });
}

const getIngredientsByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    
    let userWithIngredients;
    try {
        userWithIngredients = await User.findById(userId).populate('ingredients');
    } catch (e) {
        const error = new HttpError(
            "Failed to retrieve a user's ingredients, please try again",
            500
        );
        return next (error);
    }

    if (!userWithIngredients || userWithIngredients.length < 1) {
        const error = new HttpError(
            "Could not find any ingredients for the provided user id.", 404
        );
        return next (error);
    }

    res.json({ ingredients: userWithIngredients.ingredients.map(p => p.toObject({ getters: true })) });

}

const createIngredient = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError("Invalid input.", 422));
    }

    const { name, description } = req.body;

    const createdIngredient = new Ingredient({
        name, description, 
        creator: req.userData.userId,
        image: req.file.path,
    })

    let user;
    try {
        user = await User.findById(req.userData.userId);
    } catch (e) {
        const error = new HttpError(
            'Failed to find the referenced user, please try again',
            500,
            e
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError(
            "Could not find a user for the provided id.", 404
        );
        return next (error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdIngredient.save({ session: sess });
        user.ingredients.push(createdIngredient);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Failed to create a ingredient, please try again',
            500,
            err
        );
        return next (error);
    }

    res.status(201).json({ingredient: createdIngredient.toObject({ getters: true }) });
}

const editIngredient = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        const error = new HttpError(
            "Invalid input.", 422
        );
        return next (error);
    }

    const ingredientId = req.params.pid;
    const { name, description } = req.body;

    let ingredient;
    try {
        ingredient = await Ingredient.findById(ingredientId);
    } catch (e) {
        const error = new HttpError(
            'Failed to retrieve a ingredient, please try again',
            500
        );
        return next (error);
    }

    if (!ingredient || ingredient.creator.toString() !== req.userData.userId) {
        const error = new HttpError(
            "Could not find a ingredient for the provided ingredient and user ids.", 404
        );
        return next (error);
    }
    if (name) ingredient.name = name;
    if (description) ingredient.description = description;

    try {
        await ingredient.save();
    } catch (err) {
        const error = new HttpError(
            'Failed to save edits for a ingredient, please try again',
            500
        );
        return next (error);
    }

    res.status(200).json({ ingredient: ingredient.toObject({ getters: true }) });
}

const deleteIngredient = async (req, res, next) => {
    const ingredientId = req.params.pid;

    let ingredient;
    try {
        ingredient = await Ingredient.findById(ingredientId).populate('creator');
    } catch (e) {
        const error = new HttpError(
            'Failed to retrieve a ingredient, please try again',
            500
        );
        return next (error);
    }

    if (!ingredient || ingredient.creator.id !== req.userData.userId) {
        const error = new HttpError(
            "Could not find a ingredient for the provided ingredient and user ids.", 404
        );
        return next (error);
    }

    const imagePath = ingredient.image;

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await ingredient.deleteOne({ session: sess });
        ingredient.creator.ingredients.pull(ingredient);
        await ingredient.creator.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Failed to delete a ingredient, please try again',
            500
        );
        console.log(err)
        return next (error);
    }

    fs.unlink(imagePath, (err) => { console.log(err); });

    res.status(204).json({});
}

exports.getIngredientById = getIngredientById;
exports.getIngredientsByUserId = getIngredientsByUserId;
exports.createIngredient = createIngredient;
exports.editIngredient = editIngredient;
exports.deleteIngredient = deleteIngredient;