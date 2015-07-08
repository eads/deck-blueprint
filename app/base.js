var $slideContainer;
var $slides;

var onSlideChange = function(e, from, to) {
    loadImages(to);
}

var loadImages = function(index) {
    /*
     * Lazy load images
     */
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
     * Load an image
     */
    var imageURL = $slide.data('background-image');
    var $imageContainer = $slide.find('.img-container');
    var $img = $imageContainer.find('img');
    if (!$img.attr('src')) {
      $img.attr('src', imageURL);
    }
    $imageContainer.imgLiquid();

};

var onWindowResize = function() {
  loadImages(0);
}

$(document).ready(function() {
  $slides = $('.slide');
  $slideContainer = $('.deck-container')

  $(this).bind('deck.change', onSlideChange);
  $(window).bind('resize', onWindowResize)

  $.deck($slides);

  loadImage($slides.eq(0));
  $slideContainer.removeClass('hidden');
});
