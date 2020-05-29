/* 
    převzato z následujících zdrojů:
    part 9 - https://www.youtube.com/watch?v=USaB1adUHM0
    part 10 - https://www.youtube.com/watch?v=qyomEaXQJFk
    part 11 - https://www.youtube.com/watch?v=de5gkk_40Eo
    part 12 - https://www.youtube.com/watch?v=Efwp65XF0bM
*/


require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json('No token, unauthorized');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(e){
        res.status(400).json('Invalid token');
    }  
}

module.exports = auth;