var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    password: String,
    userName: String,
    userId: String,
    userImgUrl: String,
    role: String,
    created_at: Date,
});

TodoSchema.pre('save', function (next) {
    var todo = this;
    // get the current date
    var currentDate = new Date();

    // if created_at doesn't exist, add to that field
    if (!todo.created_at) {
        todo.created_at = currentDate;
    }
    next();
});

module.exports = mongoose.model('Account', TodoSchema);