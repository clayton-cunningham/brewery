const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const ingredientsRoutes = require('./routes/ingredients-routes')
const usersRoutes = require('./routes/users-routes');
const inventoryRoutes = require('./routes/inventory-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

app.use("/api/ingredients", ingredientsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/inventory", inventoryRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, (err) => { console.log(err); });
    }
    if (res.headerSent && error) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error was thrown.'});
})

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}.wapcj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`)
    .then(() => {
        app.listen(process.env.PORT || 5000);
    })
    .catch(err => {
        console.log(err);
    });
