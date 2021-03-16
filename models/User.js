const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
});

// Load a certain model into mongoose
mongoose.model('users', userSchema);
