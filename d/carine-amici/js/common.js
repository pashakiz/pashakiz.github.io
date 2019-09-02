$(document).ready(function() {

    //preloader
    setTimeout(function() {
        var preloader = $('#page-preloader');
        if ( !preloader.hasClass('done') ) {
            preloader.addClass('done');
        }
    }, 1000);

    $('.header-wrap').on('click', '.header__btn', function(){
        $(this).closest('.header-wrap').find('.header-menu').slideToggle();
    });

    $('.custom-file-input').on('change', function(){
        $(this).closest('.custom-file').addClass('image');
    });

});
