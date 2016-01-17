// CRUD of mongo
// author: hulingchuan@hotmail.com

exports.find = function (db, name, query, callback) {

  var collection = db.collection(name)

  collection.find(query).toArray(function(err, docs){
    console.log('found...')
    db.close()
    callback(docs)
  })
}

exports.count = function (db, name, query, callback) {
  var collection = db.collection(name)

  collection.count(query, function(err, count){
    console.log('counted...')
    db.close()
    callback(count)
  })
}

exports.aggregate = function (db, name, query, callback) {
  var collection = db.collection(name)
  var cursor = collection.aggregate(query)

  var aggResult = []
  cursor.each(function(err, doc){
    if (doc == null) {
      console.log('aggregated...')
      db.close()
      callback(aggResult)
    } else {
      aggResult.push(doc)
    }
  })
}
