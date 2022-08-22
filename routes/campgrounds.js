const express = require('express');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const controller = require('../controllers/campgrounds');
const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(controller.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(controller.createCampground));
// .post(upload.array('image'), (req , res) => {
// .post(upload.single('image'), (req, res) => {
// console.log(req.body, req.files);
// console.log(req.body, req.file);
// res.send('?');
// });

router.get('/new', isLoggedIn, controller.renderNewForm);

router.route('/:id')
    .get(catchAsync(controller.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(controller.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(controller.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(controller.renderEditForm));

module.exports = router;