$(document).ready(function(){

  function offsetPosition(e) {
    var offsetTop = 0;
    do {offsetTop  += e.offsetTop;} while (e = e.offsetParent);
    return offsetTop;
  }
  var aside = document.querySelector('#sidebar-left'),
      OP = offsetPosition(aside),
      article = document.querySelector('#sidebar-right'),
      OPa = offsetPosition(article);

  window.onscroll = function() { 

    if (window.pageYOffset > article.offsetHeight - aside.offsetHeight + OPa) {
      aside.className = 'stop';
      aside.style.top = (article.offsetHeight - aside.offsetHeight - OP + OPa) + 'px';
    } else {
      aside.style.top = '0';
      aside.className = (OP < window.pageYOffset ? 'prilip' : '');
    }

  }

});