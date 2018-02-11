var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeSample');

// Log error if not connected
mongoose.connection.on('error', console.error.bind(console, 'Connection error.'));

// Log status if connected to database
mongoose.connection.once('open', function() {
    // we're connected!
    console.log("Connected to database.")
});

/** Global object for this module */
var db = {};

/** Define user schema */
var userSchema = new mongoose.Schema({ 
									name: String,
									email: String,
									active: {
										type: Boolean,
										default: false
									},
									created: { 
										type: Date, 
										default: Date.now
									}
								});

/** Tie schema to mongoose model and add it to global object*/
db.User = mongoose.model('User', userSchema);

/** Export global database object */
module.exports = db;