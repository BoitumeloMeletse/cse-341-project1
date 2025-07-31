const router = require('express').Router();
const passport = require('passport');
const contactRoutes = require('./contacts');
const taskRoutes = require('./tasks');

// swagger routes
router.use('/', require('./swagger'));

// contacts routes
router.use('/contacts', require('./contacts'));

// tasks routes
router.use('/tasks', require('./tasks'));

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