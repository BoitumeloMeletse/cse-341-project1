// routes/index.js
const router = require('express').Router();
const passport = require('passport');

// swagger routes
router.use('/', require('./swagger'));

// contacts routes
router.use('/contacts', require('./contacts'));

// tasks routes
router.use('/tasks', require('./tasks'));

// menu routes - make sure this line is correct
router.use('/menu', require('./menu'));

// orders routes
router.use('/orders', require('./orders')); // Changed from '/order' to '/orders' for consistency

// login with GitHub
router.get('/login', passport.authenticate('github'));

// logout
router.get('/logout', function (req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;