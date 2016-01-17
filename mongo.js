var operators = require('./operation');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
 
var url = 'mongodb://iseo:topcoder@candidate.60.mongolayer.com:10408/ibmgo20151222';

var connect = function (operator, collectionName, query, delegator) {

  console.log('connecting to mongo...')

  MongoClient.connect(url, function (err, db) {

    assert.equal(null, err)
    console.log('connected to mongo...')

    operator(db, collectionName, query, delegator)
  })
}

exports.find = function (collectionName, query, callback) {
  console.log('finding...')
  connect(operators.find, collectionName, query, callback)  
}

exports.count = function (collectionName, query, callback) {
  console.log('couting...')
  connect(operators.count, collectionName, query, callback)
}

exports.aggregate = function (collectionName, query, callback) {
  console.log('aggregating...')
  connect(operators.aggregate, collectionName, query, callback)
}
