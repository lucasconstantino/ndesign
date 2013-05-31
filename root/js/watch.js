(function($) {

  $('[watch]').each(function() {
    var element = this,
        $element = $(this),
        attr = $element.is('link') ? 'href' : 'src',
        url = element[attr],
        step = $element.attr('watch') || 150,
        count = 0,
        currData = null;
        
    function update() {
      element[attr]
        = url
        + (url.indexOf('?') > -1 ? '&' : '?')
        + 'watch='
        + count++
        + new Date().getTime()
    }

    function watch() {
      $.ajax({
        url: url,
        success: function(data, status, req) {
          // setTimeout();
          if(currData != data) {
            currData = data;
            update();
          }
          
          setTimeout(watch, step);
        },
        error: function(req, status) {
          // Log ERROR.
        }
      });
    }

    watch();
  });

})(jQuery);