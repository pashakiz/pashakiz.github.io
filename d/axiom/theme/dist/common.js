$(document).ready(function() {

	/* show drobdown menu for tablets */
	$(".mobile_mnu_btn").click(function(){
		$(".m_menu").toggleClass("show");
	});

	$(".m_menu > li.exp > a").click(function(){
		if ($(window).width() < 1200) { //for all devices exept wide Desktops
			$(".sub_menu").toggleClass("show");
			var MenuIconOpen = $(this).children("i").hasClass("icon-open-menu");
			if (MenuIconOpen) {
				$(this).children("i").removeClass("icon-open-menu");
				$(this).children("i").addClass("icon-close-menu");
			} else{
				$(this).children("i").removeClass("icon-close-menu");
				$(this).children("i").addClass("icon-open-menu");
			};
		};
	});
		
	/* show/hide search bar for tablets */
	$(".m_icon-search").click(function(){
		$(".m_search_container").toggle();
		$(".mobile_mnu_btn > p").toggle();
	});

	/* show drobdown menu for tablets in footer */
	$(".btn4mm").click(function(){
		if ($(window).width() < 1200) { //for all devices exept wide Desktops
			$(this).parent().find(".sub_container").toggleClass("show");
			var MenuIconOpen = $(this).children("i").hasClass("icon-open-menu");
			if (MenuIconOpen) {
				$(this).children("i").removeClass("icon-open-menu");
				$(this).children("i").addClass("icon-close-menu");
			} else{
				$(this).children("i").removeClass("icon-close-menu");
				$(this).children("i").addClass("icon-open-menu");
			};
		};
	});


	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	//$(".fancybox").fancybox();

	//CARUOUSEL
	//Documentation: http://owlgraphic.com/owlcarousel/
	$("#carousel").owlCarousel({
		items : 1,
		itemsDesktop : [1199,1],
		itemsDesktopSmall : [979,1],
		itemsTablet : [768,1],
		itemsMobile : [479,1],
		autoPlay : true,
		slideSpeed : 200,
		paginationSpeed : 800,
		itemsScaleUp : false
	});

	//PRODUCTS CARUOUSEL TABS of index page
	$(".tab1").click(function(){
		$(".tab1").addClass("current");
		$(".tab2").removeClass("current");
		$(".t1c").addClass("visible");
		$(".t2c").removeClass("visible");
	});
	$(".tab2").click(function(){
		$(".tab2").addClass("current");
		$(".tab1").removeClass("current");
		$(".t2c").addClass("visible");
		$(".t1c").removeClass("visible");
	});

	//PRODUCTS CARUOUSEL
	$("#products_best").owlCarousel({
		items : 5,
		navigation : true,
		navigationText : ['<i class="icon-arrow-left"></i>','<i class="icon-arrow-right"></i>'],
		itemsDesktop : [1199,4],
		itemsDesktopSmall : [979,3],
		itemsTablet : [768,2],
		itemsMobile : [479,1],
		autoPlay : false,
		slideSpeed : 200,
		paginationSpeed : 800,
		itemsScaleUp : false
	});
	$("#products_new").owlCarousel({
		items : 5,
		navigation : true,
		navigationText : ['<i class="icon-arrow-left"></i>','<i class="icon-arrow-right"></i>'],
		itemsDesktop : [1199,4],
		itemsDesktopSmall : [979,3],
		itemsTablet : [768,2],
		itemsMobile : [479,1],
		autoPlay : false,
		slideSpeed : 200,
		paginationSpeed : 800,
		itemsScaleUp : false
	});
	
	//ajax send form
	//Documentation: http://api.jquery.com/jquery.ajax/
	$("form").submit(function() {
		$.ajax({
			type: "GET",
			url: "mail.php",
			data: $("form").serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});

});