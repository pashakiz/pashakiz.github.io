$(document).ready(function() {

    $('.header').on('click', '.header__btn', function(){
        var header = $(this).closest('.header');
        var btn = $(this).closest('.header').find('.header__btn');
        var menu = $(this).closest('.header').find('.header__menu');
        if ( btn.hasClass('icon-menu-down') ) {
            menu.slideUp();
            btn.removeClass('icon-menu-down');
            btn.addClass('icon-menu');
        } else {
            menu.slideDown();
            btn.removeClass('icon-menu');
            btn.addClass('icon-menu-down');
        }
    });
    $('.custom-file-input').on('change', function(){
        //$('.custom-file-img').css('background-image', 'url(' + $(this).val() + ')');
        $('.custom-file-img').show();
    });

});