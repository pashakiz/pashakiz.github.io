function enableStylesheet (node) {
    node.disabled = false;
}

function disableStylesheet (node) {
    node.disabled = true;
}

var themelight = document.getElementById('light');
var themedark = document.getElementById('dark');
if( $('html').hasClass('themedark') ) {
    turnDarkTheme();
}
if( $('html').hasClass('themelight') ) {
    turnLightTheme();
}

function turnLightTheme() {
    $('html').removeClass('themedark');
    $('html').addClass('themelight');
    $('.cssmode__icon').removeClass('icon-sun');
    $('.cssmode__icon').addClass('icon-moon');
    disableStylesheet(themedark);
    enableStylesheet(themelight);
}
function turnDarkTheme(){
    $('html').removeClass('themelight');
    $('html').addClass('themedark');
    $('.cssmode__icon').removeClass('icon-moon');
    $('.cssmode__icon').addClass('icon-sun');
    disableStylesheet(themelight);
    enableStylesheet(themedark);
}

$('.cssmode__icon').on('click', function(){
    if( $('html').hasClass('themedark') ) {
        turnLightTheme();
    } else {
        turnDarkTheme();
    }
});