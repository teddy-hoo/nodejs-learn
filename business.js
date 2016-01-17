var mongo = require('./mongo')
var lib   = require('./lib')

exports.canDownload = function (callback) {
  mongo.count('players', {}, function (playerCount) {
    mongo.count('playerlogs', {}, function (playerLogCount) {
      callback(playerCount > 0 && playerLogCount > 0)
    })
  })
}

exports.download = function (callback) {
  mongo.find('players', {}, function (players) {
    var idAndStep = lib.getIdAndStep(players)
    var maxQuery = [
      {
        $match: {
          //playerId: {$in: Object.keys(idAndStep)},
          action: 1,
        }
      },
      {
        $group: {
          _id: "$playerId",
          time: {$max: "$when"}
        }
      }
    ]
    mongo.aggregate('playerlogs', maxQuery, function (maxLogs) {
      var minQuery = [
        {
          $match: {action: 1}
        },
        {
          $group: {_id: "$playerId", time: {$min: "$when"}}
        }
      ]
      mongo.aggregate('playerlogs', minQuery, function (minLogs) {
        var one = lib.compose(idAndStep, maxLogs, minLogs)
        //var sorted = lib.sort(one)
        callback(lib.toCSV(one))
      })
    })
  })
}
