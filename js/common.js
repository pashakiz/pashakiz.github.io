function enableStylesheet (node) {
    node.disabled = false;
}

function disableStylesheet (node) {
    node.disabled = true;
}

var themelight = document.getElementById('themelight');
var customlight = document.getElementById('customlight');
var themedark = document.getElementById('themedark');
var customdark = document.getElementById('customdark');

var userTheme = localStorage.getItem('userTheme');
if (userTheme) {
    if (userTheme == 'dark') {
        turnDarkTheme();
    }
    if (userTheme == 'light') {
        turnLightTheme();
    }
} else {
    if( $('html').hasClass('themedark') ) {
        turnDarkTheme();
    }
    if( $('html').hasClass('themelight') ) {
        turnLightTheme();
    }
}

function turnLightTheme() {
    $('html').removeClass('themedark');
    $('html').addClass('themelight');
    $('.cssmode__icon').removeClass('icon-sun');
    $('.cssmode__icon').addClass('icon-moon');
    disableStylesheet(themedark);
    disableStylesheet(customdark);
    enableStylesheet(themelight);
    enableStylesheet(customlight);
    localStorage.setItem('userTheme', 'light');
}
function turnDarkTheme(){
    $('html').removeClass('themelight');
    $('html').addClass('themedark');
    $('.cssmode__icon').removeClass('icon-moon');
    $('.cssmode__icon').addClass('icon-sun');
    disableStylesheet(themelight);
    disableStylesheet(customlight);
    enableStylesheet(themedark);
    enableStylesheet(customdark);
    localStorage.setItem('userTheme', 'dark');
}

$('.cssmode__icon').on('click', function(){
    if( $('html').hasClass('themedark') ) {
        turnLightTheme();
    } else {
        turnDarkTheme();
    }
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})