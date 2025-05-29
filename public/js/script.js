$(document).ready(function () {
  $('.upload-btn').on('click', function () {
    $('#upload-input').click();
  });

  $('#upload-input').on('change', function () {
    var uploadInput = $('#upload-input');
    if (uploadInput.val() != '') {
      var formData = new FormData();
      formData.append('upload', uploadInput[0].files[0]);

      // Show progress bar
      $('#upload-progress-container').show();
      $('#upload-progress').val(0);
      $('#upload-progress-text').text('0%');

      $.ajax({
        url: '/uploadFile',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        xhr: function () {
          var xhr = new window.XMLHttpRequest();
          xhr.upload.addEventListener("progress", function (evt) {
            if (evt.lengthComputable) {
              var percentComplete = Math.round((evt.loaded / evt.total) * 100);
              $('#upload-progress').val(percentComplete);
              $('#upload-progress-text').text(percentComplete + '%');
            }
          }, false);
          return xhr;
        },
        success: function () {
          uploadInput.val('');
          $('#upload-progress-container').hide();
        },
        error: function () {
          $('#upload-progress-text').text('Error!');
        }
      });
    }
  });
});

// make chatroom autoscroll
$(document).ready(function () {
  $('#messages').animate({
    scrollTop: 100000
  }, 800);
});
