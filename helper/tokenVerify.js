const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

exports.verifyToken = async (req, res, next) => {

    let Authorization = req.cookies.Authorization;
    if (!Authorization){
         return res.status(401).json({ message: 'Not Authorized Person' });
    }
    let payload = jwt.verify(Authorization, process.env.JWT_SECRET);
    if (!payload){
         return res.status(400).json({ message: 'unauthorized...' });
    }
    let user = await User.findOne({ _id: payload.userId });
    if (!user) {
        return res.status(404).json({ message: 'user not found...' });
    }
    req.user = user;
    next();

};