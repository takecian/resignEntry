var mongoose = require('mongoose');

NAME_RECORD = 'entry';

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: false
    },
    to: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    },
    category: {
        type: Array,
        required: false
    }
});
    console.log('new Schema');

// create object
module.exports = mongoose.model(NAME_RECORD, schema);