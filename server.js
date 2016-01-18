/**
 * author: hulingchuan@hotmail.com
 * 
 * server
 */

var http     = require('http')
var fs       = require('fs')
var lib      = require('./lib')
var business = require('./business')

http.createServer(function(request, response){
  var headers = request.headers
  var method  = request.method
  var url     = request.url
  var body    = []

  console.log('method: ' + method)
  console.log('url:    ' + url)

  // routing ...
  // index
  if (url == '/') {
    fs.readFile('./index.html', function(err, html){
      response.writeHeader(200, {"Content-Type": "text/html"})
      response.write(html)
      response.end() 
    })
  // /canDownload
  } else if (url == '/canDownload') {
    console.log('trying download...')
    business.canDownload(function (canDownload) {
      response.statusCode = canDownload ? 200 : 404
      response.write(canDownload ? 'OK' : '')
      response.end()
    })
  // /download
  } else if (url == '/download') {
    console.log('downloading...')
    business.download(function (file) {
      response.write(file)
      response.end()
    })
  // static file
  } else {
    var staticName = '.' + url
    fs.exists(staticName, function(exists){
      if (!exists) {
        response.statusCode = 404
        response.end()
      } else {
	fs.readFile(staticName, function (err, content){
	  response.writeHeader(200, {'Content-Type': 'text/text'})
          response.write(content)
	  response.end()
	})
      }
    })
  }

}).listen(9000)
