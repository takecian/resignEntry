
/*
 * GET users listing.
 */
var Post = require('../models/post.js');

// var mongoose = require('mongoose');
var util = require('util');

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

function findEntry(condition, req, res) {
    console.log('[IN]findEntry');
    var offset = req.query.offset || 0;
    var limit = req.query.limit || 6;
    var order = req.query.order || -1;
    console.log('offset = ' + offset + ', limit = ' + limit);

    Post.find(condition).skip(offset).limit(limit).sort({date: order}).exec(function(err, result) {
	        if (!err) {
                console.log('success to get entires. = ' + result);
                res.send(result);
            } else {
                console.log('fail try to get entries.');
            }
        });
    console.log('[OUT]findEntry');
}

function findCompanies(req, res) {
    console.log('findCompanies');

    Post.distinct("from").exec(function(err, result) {
            if (!err) {
                console.log('success to get companies. = ' + result);
                findAndRemove(result, '');
                res.send(result);
            } else {
                console.log('fail to get companies.');
            }
        });
}

function addEntry(req, res) {
    var title = req.query.title;
    var url = req.query.url;
    var from = req.query.from;
    var date = Date.now;
    console.log('addEntry: title = ' + title + ', url = ' + url);

    Post.save(function(err) {
        if (!err) {
            console.log('success try to get all gif.');
        } else {
            console.log('fail try to get all, err = ' + err);
        }
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
