var config = {
  username: 'smellygeekboy',
  imageCount: 5
};

var images = [];

function getInstagramFeed() {

var url = 'https://query.yahooapis.com/v1/public/yql?q=' +
            'select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Finstagram.com%2F' +
            config.username + '%2Fmedia%3Fmax_id%3D' + config.username + '%22&format=json';

console.log(url);

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

        createImages(images);
    },
    error : function(xhr, txt, e) {
      console.log('Something went wrong! Probably too many requests. Please try in few minutes ;)');
      return false;
    }
  });
}

function createImages(images) {
  console.log(images);

  if(images.length >= config.imageCount)
  {
    $('#instagramimages').empty();
    
    $.each(images, function(i, image) {
      if(i < config.imageCount)
      {
        console.log('Derp');
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
  
  /* window.setInterval(function(){
    getInstagramFeed();
  }, 15000); */
})