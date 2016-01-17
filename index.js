// ajax request
var handler = function () {
  var $downloadButton = $('#download')
  $downloadButton.prop('disabled', true)
  $.get('/canDownload').done(
    function (result) {
      download(result)
      $('#msg').text('Downloaded')
    }
  ).fail(
    function () {
      $('#msg').text('Download failed')
    }
  ).always(
    function () {
      $('#msg').show()
      $downloadButton.prop('disabled', false)
    }
  )
}

// lib functions
var download = function (data) {
  var a = document.createElement('a')
  a.download = 'data.csv'
  a.href = '/download'
  a.click()
}

// download click event
$('#download').on('click', handler)
