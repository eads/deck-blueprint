/*
 * Basic deck.js wrapper
 */

var TarbellSlideshow = (function ($) {

  var $slideContainer;
  var $slides;
  var $nextButton;
  var $previousButton;

  var settings = {};
  var currentSlideIndex = 0;

  /*
   * Lazy load images on slide change
   */
  var onSlideChange = function(e, from, to) {
    currentSlideIndex = to;
    loadImages(to);

    $previousButton.removeClass('disabled');
    $nextButton.removeClass('disabled');

    if (to === 0) {
      $previousButton.addClass('disabled');
    }
    if (to === ($slides.length - 1)) {
      $nextButton.addClass('disabled');
    }
    TarbellAnalytics.exitSlide(from);
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
    var $imageContainer = $slide.find('.img-container');
    var imageURL = $imageContainer.data('background-image');

    if (imageURL) {
      var $img = $imageContainer.find('img');
      $img.attr('src', '');
      setTimeout(function() {
        $img.attr('src', imageURL);
        $imageContainer.imgLiquid();
      }, 0);
    }
  };

  /*
   * Resize images
   */
  var onWindowResize = function(e) {
    loadImages(currentSlideIndex);
  }

  /*
   * Next slide
   */
  var onNextButtonClick = function(e) {
    e.preventDefault();
    $.deck('next');
    TarbellAnalytics.trackEvent('navigation', 'click', 'next');
  }

  /*
   * Previous slide
   */
  var onPreviousButtonClick = function(e) {
    e.preventDefault();
    $.deck('prev');
    TarbellAnalytics.trackEvent('navigation', 'click', 'previous');
  }

  /*
   * Initialize the app
   */
  var init = function(options) {

    settings = options;

    if (!settings.useHashNavigation) {
      window.location.hash = '';
      Modernizr.history = null;
    }

    $slides = $('.slide');
    $slideContainer = $('.deck-container');
    $previousButton = $('.slide-previous');
    $nextButton = $('.slide-next');

    $.deck($slides);

    $(document).bind('deck.change', onSlideChange);
    $(window).bind('resize', onWindowResize)
    $previousButton.on('click', onPreviousButtonClick);
    $nextButton.on('click', onNextButtonClick);

    loadImages(0);
    $slideContainer.removeClass('hidden');
  }

  return {
    'init': init
  }
}(jQuery));
