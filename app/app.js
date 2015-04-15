var $slideContainer;
var $slides;

var onSlideChange = function(e, from, to) {
    loadImages(to);
}

var loadImages = function(index) {
    var slides = [
        $slides.eq(index),
        $slides.eq(index + 1),
        $slides.eq(index - 1),
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
    if (background_image) {
        $slide.css('background-image', 'url(' + background_image + ')');
    }

};

$(document).ready(function() {
  $container = $('.deck-container');
  $slides = $('.slide');

  $(this).bind('deck.change', onSlideChange);

  $.deck($slides);
  loadImage($slides.eq(0));
  $container.removeClass('hidden');
});
