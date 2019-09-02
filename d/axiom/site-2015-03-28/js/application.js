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

	/* show drobdown menu in category page */
	$("aside.sidebar ul.sl_menu_category > li.exp").click(function(){
		var MenuIconClose = $(this).children("a").find("i").hasClass("icon-arrow-right");
		if (MenuIconClose) {
			$(this).children("a").find("i").removeClass("icon-arrow-right");
			$(this).children("a").find("i").addClass("icon-arrow-down");
			$(this).children("ul.drop-down").addClass("show");
			$(this).children("a").addClass("active");
		} else{
			$(this).children("a").find("i").removeClass("icon-arrow-downu");
			$(this).children("a").find("i").addClass("icon-arrow-right");
			$(this).children("ul.drop-down").removeClass("show");
			$(this).children("a").removeClass("active");
		};
	});

	/* show drobdown menu on BLOG PAGE for tablets */
	$("#blog-category-menu").click(function(){
		if ($(window).width() < 992) { //for all devices exept Desktops
			$(this).children("ul").toggleClass("show");
			var MenuIconOpen = $(this).children("h2").children("i").hasClass("icon-open-menu");
			if (MenuIconOpen) {
				$(this).children("h2").children("i").removeClass("icon-open-menu");
				$(this).children("h2").children("i").addClass("icon-close-menu");
			} else{
				$(this).children("h2").children("i").removeClass("icon-close-menu");
				$(this).children("h2").children("i").addClass("icon-open-menu");
			};
		};
	});

	$("#product-container #reviews").click(function(){
		if ( $(this).text() == "SHOW REVIEWS" ){
			$(this).html("HIDE REVIEWS");
			$("#product-container .reviews").show();
			$("#product-container .infomore").hide();
		} else {
			$(this).html("SHOW REVIEWS");
			$("#product-container .reviews").hide();
			$("#product-container .infomore").show();
		}
	});

	//Popup FancyBox
	//Documentation: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox();

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

	//CARUOUSEL ON PRODUCT PAGE
	$("#product_img").owlCarousel({
		items : 4,
		navigation : true,
		navigationText : ['<i class="icon-arrow-left"></i>','<i class="icon-arrow-right"></i>'],
		itemsDesktop : [1199,4],
		itemsDesktopSmall : [979,4],
		itemsTablet : [768,4],
		itemsMobile : [479,2],
		autoPlay : false,
		slideSpeed : 200,
		paginationSpeed : 800,
		itemsScaleUp : false
	});
	
	//CustomSelect
	$('.custom_select').customSelect();
	$('.custom_select2').customSelect();

	//Custom RadioButtons
	$("input.rb").hide().after("<i class=\"icon-check-box-unchecked\"></i>");
	$(".radio").click(function(){
		// обнуляем все радиобатоны и кастомные иконки в unchecked
		$(".radio").children(":radio").prop("checked", false);
		$(".radio").children("i").removeClass("icon-check-box");
		$(".radio").children("i").addClass("icon-check-box-unchecked");
		// устанавливаем текущий RB в checked
		$(this).children(":radio").prop("checked", true);
		$(this).children("i").removeClass("icon-check-box-unchecked");
		$(this).children("i").addClass("icon-check-box");
	});

	//Custom CheckBoxes
	$("input.cb").hide().after("<i class=\"icon-check-box-unchecked\"></i>");
	$(".check").click(function(){
		var current_checkbox = $(this).children(":checkbox");
		if (current_checkbox.prop("checked")) {
			// Снимаем отметку с checkbox'а
			current_checkbox.prop("checked", false);
			// добавляем нужный класс иконке
			$(this).children("i").removeClass("icon-check-box");
			$(this).children("i").addClass("icon-check-box-unchecked");
		} else{
			// Снимаем отметку с checkbox'а
			current_checkbox.prop("checked", true);
			// добавляем нужный класс иконке
			$(this).children("i").removeClass("icon-check-box-unchecked");
			$(this).children("i").addClass("icon-check-box");
		};
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