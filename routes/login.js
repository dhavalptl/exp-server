const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('../config');

// It is not recommanded to store user credential in memory. Currently used for demo purpose
const users = [];

const getUser = (users = [], email = '') => {
    return users.find(usr => usr.email === email);
}

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, config.SALT_ROUNDS, (err, hash) => {
        if (err) {
            return res.json({ msg: 'Error while register' });
        }
        if (getUser(users, req.body.email)) {
            return res.json({ msg: 'User is already exist' });
        }
        users.push({
            id: Date.now(),
            email: req.body.email,
            password: hash
        });
        res.json({
            msg: 'Sucessfully Registered'
        });
    });
});
router.post('/login', (req, res) => {
    const user = getUser(users, req.body.email);
    if (!user) {
        return res.json({ msg: 'User does not exist' });
    }
    bcrypt.compare(req.body.password, user.password, (err, data) => {
        if (err) {
            return res.json({ msg: 'Error while loginCredential is not valid' });
        }
        if (!data) {
            return res.json({ msg: 'Credential is not valid' });
        }
        res.json({
            msg: 'Successfully Logged In',
            token: jwt.sign({
                userId: user.id,
                email: user.email
            }, config.JWT_SECRET, {
                    algorithm: config.ALGO,
                    expiresIn: config.EXP_IN
                })
        });
    });
});

module.exports = router;