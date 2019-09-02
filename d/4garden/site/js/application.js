$(document).ready(function() {

	// Вкл/выкл мобильное меню
	$(".btn-mobile-menu").click(function() {
		$(this).parent().parent().parent().toggleClass("mobile-main-menu-open");
	});
	$(".btn-category-menu").click(function() {
		$(this).parent().parent().parent().removeClass("mobile-main-menu-open");
	});
	$(".btn-category-menu-toggle").click(function() {
		$(this).parent().find("ul.submenu").toggle();
	});

	//Свернуть/Развернуть фильтр товаров на мобильной версии
	$(".btn-filter-toggle").click(function() {
		if ( $(this).text() == "Показать фильтр" ){
			$(this).html("Свернуть фильтр");
			$(this).next("aside").slideDown(300);
		} else {
			$(this).html("Показать фильтр");
			$(this).next("aside").slideUp(300);
		}
	});

	//Свернуть/Развернуть характеристику их фильтра
	$(".button-toggle").click(function() {
		$(this).parent().find(".inner").slideToggle(300);
	});

	//Табы на странице товара
	$(".tab-title").click(function() {
		$(".tab-body").hide();
		$(this).next(".tab-body").show();
	});

	$(".btn-characteristics").click(function() {
		$(this).parent().next().children().hide();
		$(this).parent().next().children(".inner-characteristics").show();
	});
	$(".btn-reviews").click(function() {
		$(this).parent().next().children().hide();
		$(this).parent().next().children(".inner-reviews").show();
	});

	//Страница товара: Показ картинки в главной области просмотра при клике на миниатюре
	/*
	$(".btn-product-img").click(function() {
		var img_scr = $(this).children("img").attr("src");
		$(this).parents(".image").children("a").find("img").attr("src", img_scr);
		//(e = e || window.event).preventDefault? e.preventDefault() : (e.returnValue = false);
	});
	*/

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox();


	//Каруселька
	//Документация: http://owlgraphic.com/owlcarousel/

	//CARUOUSEL ON PRODUCT PAGE
	$("#product_img").owlCarousel({
		items : 3,
		navigation : true,
		navigationText : ['<i class="icon-arrow-left"></i>','<i class="icon-arrow-right"></i>'],
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [979,3],
		itemsTablet : [768,3],
		itemsMobile : [479,2],
		autoPlay : false,
		slideSpeed : 200,
		paginationSpeed : 800,
		itemsScaleUp : false
	});
	/*owl.on("mousewheel", ".owl-wrapper", function (e) {
		if (e.deltaY > 0) {
			owl.trigger("owl.prev");
		} else {
			owl.trigger("owl.next");
		}
		e.preventDefault();
	});
	$(".next_button").click(function(){
		owl.trigger("owl.next");
	});
	$(".prev_button").click(function(){
		owl.trigger("owl.prev");
	});*/

	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
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