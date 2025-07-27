const router = require('express').Router();

const contactRoutes = require('./contacts');
const taskRoutes = require('./tasks');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    // swagger.tags=['Hello World'];
    res.send('Hello World!');
});


router.use('/contacts', require('./contacts'));

router.use('/tasks', require('./tasks'));

module.exports = router;