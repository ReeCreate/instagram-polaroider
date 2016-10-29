var refreshInterval = config.refreshInterval * 1000;
var query = 'select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Finstagram.com%2F';

function getInstagramFeed() {
  var images = [];
  var url = 'https://query.yahooapis.com/v1/public/yql?q=' + query + config.username + '%2Fmedia%3Fmax_id%3D' + config.username + '%22&format=json';
  $.ajax({
    url : url,
    type : 'GET',
    dataType : 'json',
    success : function (json) {
      if (json.query.results === null || json.query.results.json.items === undefined) throwError();
      for (i in json.query.results.json.items) images.push(json.query.results.json.items[i]['images'][config.imageQuality]['url']);
        createImages(images);
    },
    error : function(xhr, txt, e) {
      throwError();
    }
  });
}

function createImages(images) {
  if(images.length >= config.imageCount)
  {
    $('#instagramimages').empty();
    $.each(images, function(i, image) {
      if(i < config.imageCount) {
        $('#instagramimages').append('<li><span class="polaroid img' + i + '"><img src="' + image + '"/></span></li>');
      }
    });
  }
}

function throwError() {
  window.alert('Error retrieving Instagram feed! Either the account doesn\'t exist or you\'re trying to refresh too often!');
  return false;
}

$(document).ready(function(){
  getInstagramFeed();
  window.setInterval(function(){
    getInstagramFeed();
  }, refreshInterval);
})