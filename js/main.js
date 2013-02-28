$(document).ready(function(){

  // === Sidebar navigation === //
  $('.submenu > a').click(function(e){
    e.preventDefault();
    var submenu = $(this).siblings('ul');
    var li = $(this).parents('li');
    var submenus = $('#sidebar li.submenu ul');
    var submenus_parents = $('#sidebar li.submenu');

    if(li.hasClass('open'))
    {
      if(($(window).width() > 768) || ($(window).width() < 479)) {
        submenu.slideUp();
      } else {
        submenu.fadeOut(250);
      }
      li.removeClass('open');
    } else
    {
      if(($(window).width() > 768) || ($(window).width() < 479)) {
        submenus.slideUp();
        submenu.slideDown();
      } else {
        submenus.fadeOut(250);
        submenu.fadeIn(250);
      }
      submenus_parents.removeClass('open');
      li.addClass('open');
    }
  });
});

/**
 * jQuery.support.cssProperty
 * To verify that a CSS property is supported (or any of its browser-specific implementations)
 *
 * @param string p - css property name
 * [@param] bool rp - optional, if set to true, the css property name will be returned, instead of a boolean support indicator
 *
 * @Author: Axel Jack Fuchs (Cologne, Germany)
 * @Date: 08-29-2010 18:43
 *
 * Example: $.support.cssProperty('boxShadow');
 * Returns: true
 *
 * Example: $.support.cssProperty('boxShadow', true);
 * Returns: 'MozBoxShadow' (On Firefox4 beta4)
 * Returns: 'WebkitBoxShadow' (On Safari 5)
 */
$.support.cssProperty = (function() {
  function cssProperty(p, rp) {
    var b = document.body || document.documentElement,
      s = b.style;

    // No css support detected
    if(typeof s == 'undefined') { return false; }

    // Tests for standard prop
    if(typeof s[p] == 'string') { return rp ? p : true; }

    //	Tests for vendor specific prop
    v	=	['Moz', 'Webkit', 'Khtml', 'O', 'Ms'],
      p	=	p.charAt(0).toUpperCase() + p.substr(1);
    for(var i=0; i<v.length; i++) {
      if(typeof s[v[i] + p] == 'string') { return rp ? (v[i] + p) : true; }
    }
  }

  return cssProperty;
})();




jQuery(document).ready(function(){

  //	Check for CSS3 Transition support. If running an older browser, add the menu transitions manually.
  if(!$.support.cssProperty("transition")){
    $("#nav").removeClass("use-trans");
    $("#nav li").each(function(){
      var obj			=	$(this);
      var submenu		=	obj.children(".submenu");
      if(submenu.length > 0)	obj
        .mouseenter(function(){	$(this).children(".submenu").fadeIn(200);	})
        .mouseleave(function(){	$(this).children(".submenu").fadeOut(200);	})
      submenu.hide();
    });
  }



  //  Following is simply a listener that allows the user to toggle the outlined regions for easier visualisation of what's happening in the CSS
  var toggle	=	$("#toggle-class");
  if(toggle.hasClass("hidden")) return;
  showBounds(toggle[0].checked);

  function showBounds(value){
    return ((typeof(value) == "boolean") ? value : value[0].checked) ?
      $("body").addClass("showbounds")	:
      $("body").removeClass("showbounds");
  }

  toggle.change(function(e){showBounds(this.checked);});

  $(window).keydown(function(e){
    if(e.keyCode == 83){ // "S"
      toggle[0].checked	=	!(toggle[0].checked);
      showBounds(toggle);
    }
  });
});