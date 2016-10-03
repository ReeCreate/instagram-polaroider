var config = {
  username: 'reecreate',
  imageCount: 5
};

var images = [];

function getInstagramFeed() {

  var url = 'http://rc8.me/rc8polaroid.json';

  $.ajax({
    url : url,
    type : 'GET',
    dataType : 'json',
    success : function (json) {
      if (json.query.results === null) {
        console.log('Account not found! Do you think it\'s valid? Please try in few minutes ;)');
        return false;
      }

      if (json.query.results.json.items === undefined) {
        console.log('Account private or empty!');
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
      console.log('Something went wrong! Probably too many requests. Please try in few minutes ;)');
      return false;
    }
  });
}

function createImages() {
  if(images.length >= config.imageCount)
  {
    $('#instagramimages').empty();
    
    $.each(images, function(i, image) {
      if(i < config.imageCount)
      {
        var img = image.substring(7);
        var url = 'https:/' + img;
        $('#instagramimages').append('<li><span class="polaroid img' + i + '"><img src="' + url + '"/></span></li>');
        images = [];
      }
    });
  }
}

$(document).ready(function(){
  
  getInstagramFeed();
  
  window.setInterval(function(){
    getInstagramFeed();
  }, 15000);
})