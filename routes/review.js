const express = require('express');
const Campground = require('../models/campground');
const Review = require('../models/review');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const controller = require('../controllers/review');

router.post('/', isLoggedIn, validateReview, catchAsync(controller.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(controller.deleteReview));

module.exports = router;