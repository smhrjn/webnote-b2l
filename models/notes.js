var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema   = new Schema({
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
    user: { 
        type: Schema.ObjectId,
        ref: 'user'
    } 
    });

module.exports = mongoose.model('notes', noteSchema);