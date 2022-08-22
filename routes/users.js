const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const controller = require('../controllers/users');

router.route('/register')
    .get(controller.renderRegister)
    .post(catchAsync(controller.createUser));

router.route('/login')
    .get(controller.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), controller.login);

router.get('/logout', controller.logout);

module.exports = router;