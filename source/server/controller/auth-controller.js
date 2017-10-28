'use strict';

const passport = require('passport');

module.exports = function(data) {
    return {
        loginLocal(req, res, next) {
            const auth = passport.authenticate('local', function(error, user) {
                if (error) {
                    next(error);
                    return;
                }

                if (!user) {
                    res.json({
                        success: false,
                        message: 'Invalid name or password!'
                    });
                }

                req.login(user, error => {
                    if (error) {
                        next(error);
                        return;
                    }

                    res.status(200).json({
                        success: true,
                        message: 'Login successful!',
                        username: user.username,
                        imageUrl: user.imageUrl,
                        userrole: user.roles
                    });
                });
            });

            auth(req, res, next);
        },
        logout(req, res) {
            req.logout();
            res.status(200).json({ success: true });
        },
        register(req, res) {
            const user = {
                username: req.body.username,
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                imageUrl: req.body.imageUrl,
                email: req.body.email,
                roles: req.body.roles
            };

            data.createUser(user)
                .then(dbUser => {
                    res.status(201).json({
                        success: true,
                        message: 'Register successful!',
                        user: dbUser
                    });
                })
                .catch(error => {
                    if (error.code && error.code == 11000) {
                        res.json({
                            success: false,
                            message: 'Username is allready taken!'
                        });
                    }
                    if (error.message && error.message == "User validation failed") {
                        res.json({
                            success: false,
                            message: "Username must be between 4 and 20 symbols!"
                        })
                    }
                });
        },
        getAll(req, res) {
            data.getAllUsers()
                .then(users => res.status(200).json(users))
                .catch(error => {
                    console.log(error);
                    res.status(500).json(error);
                });
        },
        getUserByUsername(req, res) {
            let username = req.params.username;
            data.findByUsername(username)
                .then(dbUser => {
                    res.status(201).json(dbUser);
                })
                .catch(error => res.status(500).json(error));

        }
    }
};