var config = {
  username: 'yslbeauty',
  imageCount: 20,
  proxy: ['https://crossorigin.me/']
};

var images = [];

function getInstagramFeed() {

  var url = 'https://query.yahooapis.com/v1/public/yql?q=' +
            'select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Finstagram.com%2F' +
            config.username + '%2Fmedia%3Fmax_id%3D' + config.username + '%22&format=json';

  $.ajax({
    url : url,
    type : 'GET',
    dataType : 'json',
    success : function (json) {
      if (json.query.results === null) {
        alert('Account not found! Do you think it\'s valid? Please try in few minutes ;)');
        return false;
      }

      if (json.query.results.json.items === undefined) {
        alert('Account private or empty!');
        return false;
      }

      var items = json.query.results.json.items;
      var more = json.query.results.json.more_available;

      for (i in items)
        images.push(items[i]['images']['standard_resolution']['url']);

      if (more == 'true' && images.length < config.imageCount)
        getInstagramFeed(items[19]['id'], images);
      else
        createImages();
    },
    error : function(xhr, txt, e) {
      alert('Something went wrong! Probably too many requests. Please try in few minutes ;)');
      return false;
    }
  });
}

function createImages() {
  $.each(images, function(i, image) {
    var img = image.substring(7);
    var url = config.proxy + 'https:/' + img;

    $('#instagramimages').append('<li><img src="' + url + '"/></li>');
  });
}

$(document).ready(function(){
  getInstagramFeed();
})