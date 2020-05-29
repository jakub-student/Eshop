const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) return res.status(400).json('Please enter all the fields');

    User.find()
        .then(users => {
            if(users.length) return res.status(400).json('User already exists')

            const newUser = new User({
                username,
                password
            });
        
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
        
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user._id },
                                process.env.JWT_SECRET,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user._id
                                        }
                                    });
                                }
                            )
                        })
                        .catch(err => res.status(400).json('Error: ' + err));
                })
            });
            })
            .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;