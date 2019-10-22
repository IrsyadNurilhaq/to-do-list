const jwt = require('jsonwebtoken');
const Response = require('../response/Baseresponse');

module.exports = {
    GetIdUser:(req, res) => {
        return new Promise((resolve, reject) => {
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
                resolve(userId);
            }
        })
    }
}