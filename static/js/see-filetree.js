var statusElement = $('#status');

function refreshFiletree(refresh) {
  statusElement.text((refresh ? 'Updating' : 'Loading') + ' filetree...');
  $.ajax({
    type: 'GET',
    url: '/get_filetree',
    data: 'for_display=true&refresh=' + refresh,
    success: function (data) {
      $('#container').jstree('destroy');
      $('#container').jstree({
        'check_callback': true,
        'core': data
      });
      statusElement.text('Successfully ' + (refresh ? 'updated' : 'loaded cached')+ ' filetree.');
    },
    failure: function (data) {
      statusElement.text('Could not ' + (refresh ? 'update' : 'load') + ' the filetree.');
    }
  });
}

$('#refresh').click(function () {
  refreshFiletree(true);
});

refreshFiletree(false);
