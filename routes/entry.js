
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

function findAndRemove(array, value) {
	var index = 1;
	array.forEach(function(item) {
    	if(item == value) {
	        //Remove from array
	    	array.splice(index, 1);
		    index++;
    	}    
   });
}

function getConnection(){
    var uri = process.env.MONGOHQ_URL || 'mongodb://localhost/quitEntry';
    // mongoose.connect(uri); 
    // var db = mongoose.connection;
	var con = mongoose.createConnection(uri);
	return con;	
}

function connectDB(con, callback) {
    console.log('connectDB2');
    con.on('error', console.error.bind(console, 'connection error:'));
    con.once('open', callback);
    console.log('connectDB3');
}

function findEntry(condition, req, res) {
    console.log('findEntry');
    var offset = req.query.offset || 0;
    var limit = req.query.limit || 6;
    console.log('offset = ' + offset + ', limit = ' + limit);

    var con = getConnection();

    connectDB(con, function() {
	    console.log('findEntry1');
        dump(condition);
        var entries = con.model(NAME_RECORD);
        entries.find(condition).skip(offset).limit(limit).exec(function(err, result) {
	        console.log('findEntry2');
        if (!err) {
                console.log('success to get entires. = ' + result);
                res.send(result);
            } else {
                console.log('fail try to get entries.');
            }
            con.close();
        });
    });
}

function findCompanies(req, res) {
    console.log('findCompanies');
    var con = getConnection();
    connectDB(con, function() {
        var entries = con.model(NAME_RECORD);
        entries.distinct("from", function(err, result) {
            if (!err) {
                console.log('success to get companies. = ' + result);
                findAndRemove(result, '');
                res.send(result);
            } else {
                console.log('fail to get companies.');
            }
            con.close();
        });
    });
}

function addEntry(req, res) {
    var title = req.query.title;
    var url = req.query.url;
    var from = req.query.from;
    var date = new Date(2013,4,1);
    console.log('addEntry: title = ' + title + ', url = ' + url);

    var con = getConnection();
    connectDB(con, function() {
        var Record = con.model(NAME_RECORD);
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
            con.close();
        });
    });
}

exports.search = function(req, res){
    var condition = {};
    var company = req.query.company;
    if (company) {
        condition.from = {
            $in: [company]
        };
    }
    var category = req.query.category;
    if (category) {
        condition.category = {
            $in: [category]
        };
    }
  findEntry(condition, req, res);
};

exports.companies = function(req, res){
	findCompanies(req, res);
};

exports.add = function(req, res){
	addEntry(req, res);
};
