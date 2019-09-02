$(document).ready(function() {

	// show/hide menu nav in mobile view
	$(".btn-nav-toggle").on("click", function(event) {
		if(document.documentElement.clientWidth < 992) {
			$("ul.nav").toggleClass("show");
		}
	});

	//Hover for .forwho__sidebar__item__value__helper
	$(".forwho__sidebar__item__value__helper").on("mouseenter", function () {
		$(this).show();
	});
	$(".forwho__sidebar__item__value__helper").on("mouseleave", function () {
		$(this).hide();
	});
	$(".forwho__sidebar__item__value__imgicon").on("mouseenter", function () {
		$(".forwho__sidebar__item__value__helper").show();
	});
	$(".forwho__sidebar__item__value__imgicon").on("mouseleave", function () {
		$(".forwho__sidebar__item__value__helper").hide();
	});

	//show/hide more programm
	$(".programm__course.expand").find(".programm__course__more").show(); //init
	$(".programm__course__bth-more").on("click", function () {
		var el_parent = $(this).parent(),
			el_more = $(this).parent().find(".programm__course__more");
		if ( el_parent.hasClass("expand") ) {
			el_parent.removeClass("expand");
			el_more.slideUp();
		} else {
			el_parent.addClass("expand");
			el_more.slideDown();
		}
	});

	//Навигация по Landing Page
	//$(".top_mnu") - это верхняя панель со ссылками.
	//Ссылки вида <a href="#contacts">Контакты</a>
	$(".nav").navigation();

	//Плавный скролл до блока .div по клику на .scroll
	//Документация: https://github.com/flesler/jquery.scrollTo
	// $("a.scroll").click(function() {
	// 	$.scrollTo($(".div"), 800, {
	// 		offset: -90
	// 	});
	// });

	//Каруселька
	//Документация: http://www.owlcarousel.owlgraphic.com/docs/started-welcome.html
	$(".reviews__slider").owlCarousel({
		margin: 30,
		items : 3,
		loop: true,
		nav : true,
		navText : ['<i class="icon icon-arrow-left"></i>','<i class="icon icon-arrow-right"></i>'],
		autoPlay : false,
		responsive : {
			0 : {
				margin: 0,
				items : 1
			},
			768 : {
				items : 2
			},
			1199 : {
				margin: 30,
				items : 3
			}
		}
	});

});