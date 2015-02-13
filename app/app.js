var $wrapper;
var $slides;

var afterSlideLoad = function(anchorLink, index, slideAnchor, slideIndex) {
  loadImages(slideIndex);
  $slides.eq(slideIndex).addClass('active');
}

var onSlideLeave = function(anchorLink, index, slideIndex, direction) {
  $slides.eq(slideIndex).removeClass('active');
}

var loadImages = function(slideIndex) {
    var slides = [
      $slides.eq(slideIndex - 1),
      $slides.eq(slideIndex),
      $slides.eq(slideIndex + 1),
    ];

    for (var i = 0; i < slides.length; i++) {
      loadImage(slides[i]);
    };
}

var loadImage = function($slide) {
    /*
    * Lazy load images.
    */
    var background_image = $slide.data('background-image');

    if ($slide.css('background-image') == 'none' && background_image) {
      $slide.css('background-image', 'url(' + background_image + ')');
    }

    //var background_size = $slide.data('background-size');
    if ($(window).height() > $(window).width()) {
      $slide.css('background-size', 'cover');
    } else {
      $slide.css('background-size', 'contain');
    }

};

$(document).ready(function() {
  $wrapper = $('#fullpage');
  $slides = $('.slide');

  var anchors = ['_'];
  $slides.each(function() {
    anchors.push($(this).data('anchor'));
  });


  $wrapper.fullpage({
    anchors: (TARBELL_PREVIEW_SERVER) ? anchors : false,
    loopHorizontal: false,
    scrollingSpeed: 400,
    animateAnchor: false,
    onSlideLeave: onSlideLeave,
    afterSlideLoad: afterSlideLoad
  });

});
