/**
 * @file
 * Change background on section change.
 */

$(function() {

  var form = $('#contact-form'),
      sentMessage = $('#sent-form');



  /**
   * METHODS
   */
  
  function ajaxFormSender(e) {

    // Always prevent default submition.
    e.preventDefault();

    // Some validation may come here.
    
    if(!form.attr('disabled')) {
      $.ajax({
        url: form.attr('action'),
        type: 'POST',
        data: form.serialize()
      });
      
      form.fadeOut(1000, function() {
        sentMessage.fadeIn(1000);
      });
    }
    
    return false;
  }



  /**
   * EVENTS
   */
  
  form.on('submit', ajaxFormSender);


  /**
   * INITIALIZE
   */

  // adaptSpacing();
});