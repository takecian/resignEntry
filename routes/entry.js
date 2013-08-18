
/*
 * GET users listing.
 */

var mongoose = require('mongoose');
var util = require('util');

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
        required: false
    },
    category: {
        type: Array,
        required: false
    }
});
// create object
mongoose.model(NAME_RECORD, schema); /*********************************/

function dump(v) {
    return console.log(util.inspect(v));
}


function connectDB(callback) {
    var uri = process.env.MONGOHQ_URL || 'mongodb://localhost/quitEntry';
    mongoose.connect(uri); // define schema
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', callback);
}

function findEntry(condition, req, res) {
    var offset = req.query.offset || 0;
    var limit = req.query.limit || 6;
    console.log('offset = ' + offset + ', limit = ' + limit);

    connectDB(function() {
        dump(condition);
        var entries = mongoose.model(NAME_RECORD);
        entries.find(condition).skip(offset).limit(limit).exec(function(err, result) {
            if (!err) {
                console.log('success try to get all gif. = ' + result);
                res.send(result);
            } else {
                console.log('fail try to get all gif.');
            }
            mongoose.connection.close();
        });
    });
}

function addEntry(req, res) {
    var title = req.query.title;
    var url = req.query.url;
    var from = req.query.from;
    var date = new Date(2013,4,1);
    console.log('title = ' + title + ', url = ' + url);

    connectDB(function() {
        var Record = mongoose.model(NAME_RECORD);
        var newEntry = new Record({
        	title: title,
        	url: url,
        	date: date
        });
        newEntry.save(function(err) {
            if (!err) {
                console.log('success try to get all gif.');
            } else {
                console.log('fail try to get all, err = ' + err);
            }
            mongoose.connection.close();
        });
    });
}

exports.search = function(req, res){
    var condition = {};
    var category = req.query.category;
    if (category) {
        condition.category = {
            $in: [category]
        };
    }
  findEntry(condition, req, res);
};

exports.add = function(req, res){
	addEntry(req, res);
};
