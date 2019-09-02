$(document).ready(function() {

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox({
		padding : 0
	});

	// Показать/скрыть форму входа для моников > 1200
	$(".login_toggle_pc").click(function () {
		$("#login_block").toggle();
	});

	//Навигация по Landing Page
	//$(".top_mnu") - это верхняя панель со ссылками.
	//Ссылки вида <a href="#contacts">Контакты</a>
	//$(".top_mnu").navigation();

	//Плавный скролл до блока .div по клику на .scroll
	//Документация: https://github.com/flesler/jquery.scrollTo
	// $("a.scroll").click(function() {
	// 	$.scrollTo($(".div"), 800, {
	// 		offset: -90
	// 	});
	// });

	//Каруселька
	//Документация: http://owlgraphic.com/owlcarousel/
	$(".carousel").owlCarousel({
		items : 1,
		itemsDesktop : [1199,1],
		itemsDesktopSmall : [979,1],
		itemsTablet : [768,1],
		itemsMobile : [479,1],
		autoPlay : true,
		slideSpeed : 200,
		paginationSpeed : 800,
		itemsScaleUp : false,
		navigation : true,
		navigationText: ["<div class='icon-prevSlide'></div>","<div class='icon-nextSlide'></div>"]
	});

	//Кнопка "Наверх"
	// hide #button-up first
	$("#button-up").hide();
	 
	// fade in #button-up
	if ($(window).width() > 1200) { //for Desktops bigger 1200
		$(function () {
			$(window).scroll(function () {
				if ($(this).scrollTop() > 600) {
					$('#button-up').fadeIn('slow');
				} else {
					$('#button-up').fadeOut('fast');
				}
			});

			// animate button opacity on hover
			$('#button-up').mouseover(function(){
				$(this).animate({opacity: 0.65},100);
			}).mouseout(function(){
					$(this).animate({opacity: 1},100);
				});

			// scroll body to 0px on click
			$('#button-up').click(function () {
				$('body,html').animate({scrollTop: 0}, 800);
				return false;
			});
		});
	}
	
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