$(document).ready(function() {

	/* Placeholder
		Пример вызова:
		placeholder(".feedback__name");
		placeholder(".feedback__email");
		в html необходимо указать атрибут value
		<input class="feedback__name" type="text" name="name" value="Имя Фамилия">
		<input class="feedback__email" type="text" name="email" value="E-mail">
	*/
	placeHolder(".search_field");
	function placeHolder(selector) {
		var title = "";
		title = $(selector).val();
		if (title == "") {
			return false;
		}
		$(selector).on("focus", function() {
			if( $(this).val() == title || $(this).val() == "" ) {
				$(this).val("");
			}
		});
		$(selector).on("blur", function() {
			if( $(this).val() == "" ) {
				$(this).val(title);
			}
		});
	}

	$(".btn-mobile-nav").on("click", function(){
		$(".nav-wrap .nav").toggleClass("show");
	});

	$('.readmore').on('click', function(){
		if ( $(this).text() == "развернуть" ){
			$(this).parents(".info").find(".text .full_text").show();
			$(this).html("свернуть");
			$(this).parents(".info").find(".text").removeClass("cuted");
		} else {
			$(this).parents(".info").find(".text .full_text").hide();
			$(this).html("развернуть");
			$(this).parents(".info").find(".text").addClass("cuted");
		}
	});

	//Parallax (Stellar)
	//Документация: http://markdalgleish.com/projects/stellar.js/docs/
	//<div class="image" data-stellar-background-ratio="0">...</div>
	// $.stellar({
	// 	horizontalScrolling: false,
	// 	verticalOffset: 0
	// });
	
	//Попап менеджер FancyBox
	//Документация: http://fancyapps.com/fancybox/
	//<a class="fancybox" rel="group" href="big_image_1.jpg"><img src="small_image_1.jpg" alt="" /></a>
	//<a class="fancybox" rel="group" href="big_image_2.jpg"><img src="small_image_2.jpg" alt="" /></a>
	// $(".fancybox").fancybox();

	//Навигация по Landing Page
	//$(".top_mnu") - это верхняя панель со ссылками.
	//Ссылки вида <a href="#contacts">Контакты</a>
	//$(".top_mnu").navigation();

	//Добавляет классы дочерним блокам .block для анимации
	//Документация: http://imakewebthings.com/jquery-waypoints/
	// $(".block").waypoint(function(direction) {
	// 	if (direction === "down") {
	// 		$(".class").addClass("active");
	// 	} else if (direction === "up") {
	// 		$(".class").removeClass("deactive");
	// 	};
	// }, {offset: 100});

	//Плавный скролл до блока .div по клику на .scroll
	//Документация: https://github.com/flesler/jquery.scrollTo
	// $("a.scroll").click(function() {
	// 	$.scrollTo($(".div"), 800, {
	// 		offset: -90
	// 	});
	// });

	//Каруселька
	//Документация: http://www.owlcarousel.owlgraphic.com/docs/started-welcome.html
	$(".owl-carousel").owlCarousel({
		items: 1,
		nav: true,
		navText: ['<i class="icon-arrow-left"></i>','<i class="icon-arrow-right"></i>'],
		dots: true,
		loop: true,
		autoplay: true
	});

	$(".owl-carousel-news").owlCarousel({
		items: 1,
		dots: true,
		loop: true //,		autoplay: true
	});

	//Кнопка "Наверх"
	//Документация:
	//http://api.jquery.com/scrolltop/
	//http://api.jquery.com/animate/
	// $("#top").click(function () {
	// 	$("body, html").animate({
	// 		scrollTop: 0
	// 	}, 800);
	// 	return false;
	// });
	
	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("form").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $("form").serialize(),
			success: function(data) {
				//$('#order_status').html(data);
				$('#order_status').html('Спасибо, Ваша заявка отправлена!');
			},
			error:  function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});

});