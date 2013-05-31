/**
 * @file
 * Change background on section change.
 */

$(function() {

  var spacings = $('.spacing');



  /**
   * METHODS
   */
  
  function adaptSpacing() {
    var height = (window.innerHeight/3) * 1.8;

    // Change the spacing.
    spacings.height(height).eq(-1).height(height / 2);
  }



  /**
   * EVENTS
   */
  
  $(window).resize(adaptSpacing);


  /**
   * INITIALIZE
   */

  adaptSpacing();
});