$(document).ready(function() {

	//lazyload
	$("img.lazy").lazyload();


	//Эффект наведения на лого
	$("a.logo").on({
		mouseenter: function () {
			$("header").addClass('bg-blue');
		},
		mouseleave: function () {
			$("header").removeClass('bg-blue');
		}
	});

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox({
		padding : 0,
		autoDimensions: true,
		width: 740,
		height: 480,
		showNavArrows: false
	});

	//Каруселька
	//Документация: http://owlgraphic.com/owlcarousel/
	$(".carousel").owlCarousel({
		items : 1,
		itemsDesktop : [1199,1],
		itemsDesktopSmall : [979,1],
		itemsTablet : [768,1],
		itemsMobile : [479,1],
		autoPlay : false,
		navigation : true,
		navigationText: ["<span class='icon-prev_slide'></span>","<span class='icon-next_slide'></span>"]
	});

	/* показать меню в мобильной версии сайта */
	$(".mobile_menu").click(function(){
		$("ul.menu").toggleClass("show");
	});

	//Работа фильтра
	$("nav ul.menu > li > a").click(function(){
		var filterCriteria = $(this).attr("href").substr(1),
		filterCriteriaClassName = ".filter_" + filterCriteria,
		allElem = $(".country-items .country-item"),
		disableElem = $(".country-items .country-item").not(filterCriteriaClassName);

		$("nav ul.menu > li > a").removeClass("active");
		$(this).addClass("active");

		allElem.removeClass("disable");
		allElem.find(".hover").removeClass("disable");
		if (filterCriteria != "all") {
			disableElem.addClass("disable");
			disableElem.find(".hover").addClass("disable");
		}
	});

});