const express = require('express');
const router = express.Router();
router.get('/', (req, res) =>
    res.send('Get all Users'));
router.post('/', (req, res) =>
    res.send('Create a new User'));
module.exports = router;