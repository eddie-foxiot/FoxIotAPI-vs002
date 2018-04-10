const mongoose = require('mongoose');

//mongoose connect
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('connected to database'+config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('database error '+ err);
});