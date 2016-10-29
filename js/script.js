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
        $('#instagramimages').append('<li><span class="polaroid img' + i + ' draggable"><img src="' + image + '"/></span></li>');
      }
    });
  }
  layoutImages();
}

function throwError() {
  window.alert('Error retrieving Instagram feed! Either the account doesn\'t exist or you\'re trying to refresh too often!');
  return false;
}

$(document).ready(function(){
  getInstagramFeed();
  if(refreshInterval > 0) {
    window.setInterval(function(){
      getInstagramFeed();
    }, refreshInterval);
  }})

function layoutImages() {
  var viewportHeight = document.documentElement.clientHeight;
  var viewportWidth = document.documentElement.clientWidth;
  
  var minImageWidth = Math.round(viewportWidth * config.minimumImageWidthPercent / 100);
  var maxImageWidth = Math.round(viewportWidth * config.maximumImageWidthPercent / 100);

  var ul = document.getElementById("instagramimages");
  var items = ul.getElementsByTagName("img");
  
  for (var i = 0; i < items.length; ++i) {
    var imageWidth = getRandomInt(minImageWidth, maxImageWidth);
    var rotationAngle = getRandomInt(config.minimumImageRotationAngle, config.maximumImageRotationAngle);
    var paddingSize = Math.round(imageWidth * config.borderSizePercentage / 100);

    items[i].style.width = imageWidth;
    items[i].parentElement.style.webkitTransform = "rotate(" + rotationAngle + "deg)";
    items[i].parentElement.style.padding = paddingSize + "px";
    items[i].parentElement.style.paddingBottom = paddingSize * 4 + "px";

    var spanTopPosition = getRandomInt(20, viewportHeight - items[i].parentElement.clientWidth);
    var spanLeftPosition = getRandomInt(20, viewportWidth - items[i].parentElement.clientWidth);

    items[i].parentElement.style.top = spanTopPosition + "px";
    items[i].parentElement.style.left = spanLeftPosition + "px";

    items[i].parentElement.style.zIndex = getRandomInt(0, config.imageCount);

    $(".draggable").draggable();
    $(".draggable").on('mousedown',(function() {
      $(this).css('z-index', getHighestZIndex());
    }));

  }
}

function getHighestZIndex() {
  var draggables = document.getElementsByClassName("draggable");
  var highestZIndex = 0;
  for (var i = 0; i < draggables.length; ++i) {
    var draggableZIndex = draggables[i].style.zIndex; 
    if(draggableZIndex > highestZIndex) highestZIndex = draggableZIndex; 
  }

  return highestZIndex + 1;
}

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min + 1)) + min;
}