'use strict';

const router = require('express').Router(),
    createUsersController = require('../controller/auth-controller'),
    data = require('../data'),
    auth = require('../middlewares/auth-middleware');

const userController = createUsersController(data);

module.exports = app => {
    router
        .post('/api/users/register', userController.register)
        .put('/api/users/login', userController.loginLocal)
        .post('/api/users/logout', auth.isAuthenticated, userController.logout)
        .get('/api/users/:username', userController.getUserByUsername)
        .get('/api/users', userController.getAll)

    app.use(router);
}