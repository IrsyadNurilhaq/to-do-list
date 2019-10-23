const express    = require("express");
const bodyParser = require('body-parser');
const dotenv     = require('dotenv');
dotenv.config();

//Database config
require('./server/config/database');

//API Route
const API_URL = require('./server/routes/Api.route');
const app = express(); 

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Prefix v1
app.use('/v1', API_URL); 

app.listen(process.env.PORT || '8080', () => console.log(`server start on port ${process.env.PORT}`)); 