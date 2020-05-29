/* 
    převzato z následujících zdrojů:
    part 9 - https://www.youtube.com/watch?v=USaB1adUHM0
    part 10 - https://www.youtube.com/watch?v=qyomEaXQJFk
    part 11 - https://www.youtube.com/watch?v=de5gkk_40Eo
    part 12 - https://www.youtube.com/watch?v=Efwp65XF0bM
*/

const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.route('/').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) return res.status(400).json('Please enter all the fields');

    User.findOne({ username })
        .then(user => {
            if(!user) return res.status(400).json('User does not exist')
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(!isMatch) return res.status(400).json('Invalid credentials')

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
            
            })
            .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/user').get(auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;