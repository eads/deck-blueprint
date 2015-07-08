var $slideContainer;
var $slides;

/*
 * Lazy load images on slide change
 */
var onSlideChange = function(e, from, to) {
  loadImages(to);
}

/*
 * Lazy load images
 */
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

/*
 * Load an image
 */
var loadImage = function($slide) {
  var imageURL = $slide.data('background-image');
  var $imageContainer = $slide.find('.img-container');
  var $img = $imageContainer.find('img');
  if (!$img.attr('src')) {
    $img.attr('src', imageURL);
  }
  $imageContainer.imgLiquid();
};

/*
 * Resize images
 */
var onWindowResize = function() {
  var currentSlideIndex = $slides.index($.deck('getSlide'));
  loadImages(currentSlideIndex);
}

/*
 * Initialize the app
 */
$(document).ready(function() {
  $slides = $('.slide');
  $slideContainer = $('.deck-container')

  $(this).bind('deck.change', onSlideChange);
  $(window).bind('resize', onWindowResize)

  $.deck($slides);

  loadImage($slides.eq(0));
  $slideContainer.removeClass('hidden');
});
