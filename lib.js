
var arrayToHash = function (arr) {
  var hash = {}
  for (var a in arr) {
    hash [arr[a]._id] = arr[a].time
  }
  return hash
}

exports.compose = function (players, maxlogs, minlogs) {

  var allInOne = []

  var max = arrayToHash(maxlogs)
  var min = arrayToHash(minlogs)

  for (var p in players) {
    allInOne.push(
      {
        ibmId: players[p].ibmId,
        step: players[p].step,
        firstAccessTime: max[p],
        lastAccessTime: min[p],
      }
    )
  }

  return allInOne;
}

exports.toCSV = function (arr) {
  var CSV = ""
  var single = arr[0]
  for (var i in single) {
    CSV += i + ','
  }
  CSV += "\n"

  arr.forEach(
    function (d) {
      for (var s in d){
        CSV += d[s] + ','
      }
      CSV += "\n"
    }
  )

  return CSV
}

exports.getIdAndStep = function (players) {
  var idAndStep = {}
  var regex = /[^/]+$/
  players.forEach(
    function (player) {
      var ibmId = player.ibmId.match(regex)[0]
      idAndStep[player._id] = {
        step: player.step,
        ibmId: ibmId
      }
    }
  )
  return idAndStep
}

