const express = require('express');
const router = express.Router();
const members = [{
    id: 1,
    name: 'ABC',
    email: 'atestsampleuser@a.com'
}]; // Sample members

router.get('/', (req, res) => res.json(members));

module.exports = router;