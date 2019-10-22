const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const Response = require('../response/Baseresponse');

const Auth = async(req, res, next) => {
    if (req.headers && req.headers.authorization) {
        token = req.header('Authorization').replace('Bearer ', '')
        let authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.JWT_KEY);
        } catch (e) {
            return res.status(401).json(Response.Unauthorized());
        }
        let userId = decoded._id;
        User.findOne({_id: userId, 'tokens.token': token}).then(function(){
           next();
        });
    } else{
        return res.status(401).json(Response.Unauthorized());
    }

}
module.exports = Auth