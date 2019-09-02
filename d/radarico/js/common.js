$(document).ready(function() {

	// Placeholder
	// Doc: https://github.com/NV/placeholder.js/
	$("[placeholder]").textPlaceholder();

    // UP button
    $("#top").on('click', function () {
        $("body, html").animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    // show/hide mobile view
    $(".nav-mobile-toggle").on('click', function () {
        $(".nav_mobile").slideToggle();
    });

    // Sort table.table-ico (2.html)
    $(".js-sort-table").on('click', function () {
        var icon = $(this).find('.icon-arrow-down');
        $('.icon-arrow-down').removeClass('active');
        icon.addClass('active');
        icon.toggleClass('up');
        // sorting...
    });

    // .nav-filter expand
    $(".nav-filter__item").on('click', function () {
        var link = $(this).find('.nav-filter__link');
        if( link.hasClass('active') ) {
            $(this).find('.dropdown').slideUp();
            link.removeClass('active');
            $(this).find('.icon-arrow-down').removeClass('up');
        } else {
            $('.nav-filter__link').removeClass('active');
            $(this).find('.nav-filter__link').addClass('active');
            $('.nav-filter .dropdown').slideUp();
            $(this).find('.dropdown').slideDown();
            $(this).find('.icon-arrow-down').addClass('up');
        }
    });

    // Custom checkboxes
    $(".checkbox").on("click", function() {
        var current_checkbox = $(this).children(":checkbox");
        if ( current_checkbox.prop("checked") ) {
            current_checkbox.prop("checked", false);
            $(this).children(".checkbox__icon").removeClass("icon-check");
        } else {
            current_checkbox.prop("checked", true);
            $(this).children(".checkbox__icon").addClass("icon-check");
        }
    });

});