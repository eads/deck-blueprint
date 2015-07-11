/*
 * Basic Google analytics wrapper
 *
 * If Google analytics is not configured, core trackEvent method acts as a noop.
 */

var TarbellAnalytics = (function () {
  // Allow module to be called without sending anything
  var enabled = false;

  // Global time tracking variables
  var slideStartTime =  new Date();
  var timeOnLastSlide = null;

  /*
   * Google Analytics
   */
  var setupGoogle = function(trackerID) {
    (function(i,s,o,g,r,a,m) {
      i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', trackerID, 'auto');
    ga('send', 'pageview');
  }

  /*
   * Event tracking.
   */
  var trackEvent = function(category, name, label, value) {
    if (!enabled) return;

    var eventData = {
      'hitType': 'event',
      'eventCategory': category,
      'eventAction': name
    }

    if (label) {
      eventData['eventLabel'] = label;
    }

    if (value) {
      eventData['eventValue'] = value
    }

    ga('send', eventData);
  }

  var exitSlide = function(index) {
    var currentTime = new Date();
    timeOnLastSlide = Math.abs(currentTime - slideStartTime);
    slideStartTime = currentTime;
    trackEvent('navigation', 'slide-exit', index, timeOnLastSlide);
  }

  /*
   * Initialize
   */
  var init = function(options) {
    var options = options || {};
    if (options.trackerID) {
      setupGoogle(options.trackerID);
      enabled = true;
    }
  }

  return {
    'init': init,
    'exitSlide': exitSlide,
    'trackEvent': trackEvent
  };
}());
