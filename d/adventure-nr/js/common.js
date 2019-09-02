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

});