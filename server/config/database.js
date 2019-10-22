const mongoose = require('mongoose');

// let dev_db_url = 'mongodb+srv://user_todo:Fm4CbT3JADAYPqal@irsyadnurilhaq-4w274.mongodb.net/test?retryWrites=true&w=majority';
let mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB, { 
    useNewUrlParser: true,  
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));