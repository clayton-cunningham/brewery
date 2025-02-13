
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
    
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (e) {
        const error = new HttpError(
            'Failed to retrieve all users, please try again',
            500
        );
        return next (error);
    }

    res.json({ users: users.map(u => u.toObject({ getters: true })) });
}

const getUserById = async (req, res, next) => {
    const userId = req.params.uid;
    
    let user;
    try {
        user = await User.findById(userId);
    } catch (e) {
        const error = new HttpError(
            'Failed to retrieve a user, please try again',
            500
        );
        return next (error);
    }

    if (!user) {
        const error = new HttpError(
            "Could not find a user for the provided id.", 404
        );
        return next (error);
    }

    res.json({ user: user.toObject({ getters: true }) });
}

const userSignup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        const error = new HttpError(
            "Invalid input.", 422
        );
        return next (error);
    }

    const { name, email, password, image } = req.body;
    
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (e) {
        const error = new HttpError(
            'Failed to retrieve a user, please try again',
            500
        );
        return next (error);
    }
    if (existingUser) {
        const error = new HttpError(
            "The provided email is already assigned to a user.  Please login instead.", 422
        );
        return next (error);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    }
    catch (e) {
        const error = new HttpError(
            'Failed to create a user, please try again',
            500
        );
        return next (error);
    }
    
    const createdUser = new User({
        name,
        email,
        password: hashedPassword,
    })

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'Failed to create a user, please try again',
            500
        );
        return next (error);
    }

    let token;
    try {
        token = jsonwebtoken.sign(
            {
                userId: createdUser.id, 
                email: createdUser.email,
            }, 
            process.env.JWT_KEY,
            { expiresIn: '1h', },
        )
    } catch (e) {
        const error = new HttpError(
            'Failed to create a user, please try again',
            500
        );
        return next (error);
    }

    res.status(201).json({ userId: createdUser.id, userName: createdUser.name, email: createdUser.email, token: token });
}

const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    
    let user;
    try {
        user = await User.findOne({ email: email.toLowerCase() });
    } catch (e) {
        const error = new HttpError(
            'Failed to access the database, please try again',
            500
        );
        return next (error);
    }

    if (!user) {
        const error = new HttpError(
            "The provided credentials do not match any existing users.", 401
        );
        return next (error);
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, user.password);
    } catch (e) {
        const error = new HttpError(
            'Failed to access the database, please try again',
            500
        );
        return next (error);
    }

    if (!isValidPassword) {
        const error = new HttpError(
            "The provided credentials do not match any existing users.", 401
        );
        return next (error);
    }

    let token;
    try {
        token = jsonwebtoken.sign(
            {
                userId: user.id, 
                email: user.email,
            }, 
            process.env.JWT_KEY,
            { expiresIn: '1h', },
        )
    } catch (e) {
        const error = new HttpError(
            'Failed to retrieve a user, please try again',
            500
        );
        return next (error);
    }

    res.status(200).json({ userId: user.id, userName: user.name, email: user.email, token: token, message: `Logged into user ${user.name}`});
}

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.userSignup = userSignup;
exports.userLogin = userLogin;