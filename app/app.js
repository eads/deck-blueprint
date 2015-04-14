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
    if ($slide.css('background-image') == 'none' && background_image)
        $slide.css('background-image', 'url(' + background_image + ')');

    var background_size = $slide.data('background-size');
    if (background_size)
        $slide.css('background-size', background_size);

};

$(document).ready(function() {
  $container = $('.deck-container');
  $slides = $('.slide');

  $(this).bind('deck.change', onSlideChange);

  $.deck($slides);
  $container.removeClass('hidden');
});
