$(document).ready(function() {



	/* show drobdown menu for tablets */
	$(".mobile_mnu_btn").click(function(){
		$(".mmenu").toggle();
	});

	/* show drobdown submenu and add/remove border from "li.expand > a" */
	$("li.expand").click(function(){
		if ($(window).width() < 992) {

			var BorderBottomMenuItem = $(this).children("a").css("border-style");
			if(BorderBottomMenuItem == "none") {
				$(this).children("a").css("border-bottom", "1px solid #fff");
			}
			else {
				$(this).children("a").css("border-style", "none");
			}

			$(this).find(".mmmenu_sub").toggle();

			$(this).children("a").toggleClass("minus");

			/*if (IconMenuItem == "url(../img/icon-plus.png)") {
				$(this).children("a").css("background-image", "url(../img/icon-minus.png)");
			}
			else {
				$(this).children("a").css("background-image", "url(../img/icon-plus.png)");
			}*/
			
		};
	});

	/* show drobdown submenu only for large sreen */
	$("li.expand").hover(function(){
		if ($(window).width() > 992) {
			$(this).find(".mmmenu_sub").toggle();
		};
	});
	

	//Плавный скролл до блока .div по клику на .scroll
	//Документация: https://github.com/flesler/jquery.scrollTo
	$("a.scroll").click(function() {
		$.scrollTo($(".div"), 800, {
			offset: -90
		});
	});

	//Каруселька
	//Документация: http://owlgraphic.com/owlcarousel/
	var owl = $(".carousel");
	owl.owlCarousel({
		items : 4
	});
	owl.on("mousewheel", ".owl-wrapper", function (e) {
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
	});

	//Кнопка "Наверх"
	//Документация:
	//http://api.jquery.com/scrolltop/
	//http://api.jquery.com/animate/
	$("#top").click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	
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