const List = require('../models/List.model');
const User = require('../models/User.model');
const Helper = require('../helper/Helper');
const Response = require('../response/Baseresponse');

exports.Get = async function (req,res){
    const userId = await Helper.GetIdUser(req,res);
    const user = await User.findById(userId).populate('lists');
    res.status(200).json(Response.CollectionData(user.lists)); 
};

exports.Create = async function(req,res){
    const userId    = await Helper.GetIdUser(req,res);
    const newList  = new List(req.body);
    const user     = await User.findById(userId);
    
    newList.creator = userId;

    await newList.save(function (err) {
        if (err) {
            res.json(err.errors);
        }
    });

    user.lists.push(newList);
    await user.save(function (err) {
        if (err) {
            res.json(err.errors);
        }
        res.status(201).json(Response.Created("List"));
    });
};

exports.Update = async function(req,res){
    List.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, list) {
        if (err) return next(err);
        res.status(200).json(Response.Success())
    });
};

exports.Delete = function (req, res) {
    List.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.status(200).json(Response.Success())
    })
};