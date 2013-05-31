/**
 * @file
 * Section navigation.
 */

$(function() {

  var sections = $('section'),
      bgWrapper = $('#bg-wrapper'),
      bgs = $('img', bgWrapper).hide(),
      currSection = sections[0],
      currBg = null,
      wheeling = 0,
      clicking = false,
      lastWheel = timestamp(),
      trackedWheel = null,
      animating = false,
      navMap = {
        'home': 'inicio',
        'project': 'projeto',
        'organization': 'organização',
        'videos': 'video',
        'contact': 'contato'
      };



  /**
   * METHODS
   */
  
  // Get current timestamp.
  function timestamp() {
    return new Date().getTime();
  }

  // Return a random background.
  function randomBg() {
    var random;
    while((random = bgs.eq(Math.floor(Math.random() * bgs.length))[0]) == currBg);
    return $(currBg = random);
  }

  // Change the background randomly.
  function changeBg() {
    if(!animating) {
      animating = true;
      bgWrapper.append(randomBg().hide().fadeIn(1000, function() {
        animating = false;
      }));
    }
  }

  // Adjust the navigation menu to the application.
  function createMenu() {
    $('a[href*=#]').each(function() {
      var $this = $(this),
          hash =  $this.attr('href').replace(/#/, '');

      navMap[hash] ?  $this.attr('href', toggleHash(navMap[hash])) : null;

       $this.click(function() {
        clicking = true;
       });
    });
  }

  // Toggle '#' at beggining of anchor.
  function toggleHash(string) {
    return string.indexOf('#') == 0 ? string.substr(1) : '#' + string;
  }

  // Detect section change.
  function changeSection(delta) {
    var index = sections.index(currSection) - delta;

    if(index >= 0 && index < sections.length) {
      currSection = sections[index];
      updateNavigation();
    }
  }

  // Handle wheeling.
  function trackFastWheeling(e, delta) {

    // If last wheeling occured less then 50 miliseconds ago.
    // if((currTimestamp = timestamp()) - lastWheel < 100) {
    //   wheeling += delta;

    //   if(wheeling >= 6 || wheeling <= -6) {
    //     changeSection(delta);
    //   }
    // } else {
    //   wheeling = 0;
    // }

    // lastWheel = currTimestamp;
  }

  // Find target for system's navigation.
  function getRealTarget(fakeHash) {
    fakeHash = toggleHash(fakeHash);

    for(a in navMap) {
      if(navMap[a] == fakeHash) return $(toggleHash(a));
    }

    return null;
  }

  // Smoothly scroll to current section;
  function smoothScroll(e) {
    // TEMP
    wheeling = false;

    if(wheeling || clicking) {
      clicking = false;
      wheeling = 0;

      var target = getRealTarget(location.hash);

      if(target && target.length > 0) {
        holdEvents();

        $('body').stop().animate({
          'scrollTop': target.offset().top
        }, 750, 'easeOutQuint', bindAll);
      }
    }
  }

  // Avoid default mousewheel scrolling.
  function avoidMouseWheeling(e, delta) {
    return false;
  }

  // Update hash & currSection while scrolling.
  function updateHash(e) {
    if(!wheeling) {
      newCurrent = sections.filter(':in-viewport:first')[0] || currSection;
      if(currSection != newCurrent) {
        currSection = newCurrent;
        updateNavigation();
      }
    }
  }

  // Update navigation.
  function updateNavigation() {
    location.hash = toggleHash(navMap[currSection.id]);
    setTimeout(changeBg, 350);
  }


  /**
   * EVENTS
   */
  
  function bindAll() {
    $(window).on('hashchange', smoothScroll)
             .on('scroll', updateHash)
             .on('mousewheel', trackFastWheeling)
             .off('mousewheel', avoidMouseWheeling);
  }

  function holdEvents() {
    $(window).off('hashchange', smoothScroll)
             .off('scroll', updateHash)
             .off('mousewheel', trackFastWheeling)
             .on('mousewheel', avoidMouseWheeling);
  }

  /**
   * INITIALIZE
   */
  
  bindAll();
  changeBg();
  createMenu();

  location.hash = '';
});