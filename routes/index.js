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
router.use('/orders', require('./orders'));

router.use('/users', require('./users'));

router.use('/payments', require('./payments'));


// login with GitHub
router.get('/login', passport.authenticate('github'));

// logout
router.get('/logout', function (req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect('/');
    });
});

module.exports = router;