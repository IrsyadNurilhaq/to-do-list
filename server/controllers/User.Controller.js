const User = require('../models/User.model');
const Response = require('../response/Baseresponse');

exports.Create = async function (req, res) {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).json(Response.Registered(token))
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.Login = async function(req, res){
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            res.status(401).json(Response.Unauthorized());
        }
        const token = await user.generateAuthToken()
        res.status(200).json(Response.Login(token))
    } catch (error) {
        res.status(401).json(Response.Unauthorized());
    }
}