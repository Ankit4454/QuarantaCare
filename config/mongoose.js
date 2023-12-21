const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/QuarantaCare`);
const db = mongoose.connection;

db.on('error', console.error.bind(console, `Error while connecting to MongoDB`));

db.once('open', function(){
    console.log(`Connected to Database :: MongoDB`);
}); 

module.exports = db;