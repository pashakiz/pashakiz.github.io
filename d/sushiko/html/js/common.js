$(document).ready(function() {

	//Каруселька на главной
	//Документация: http://www.owlcarousel.owlgraphic.com/docs/started-welcome.html
	$(".carousel").owlCarousel({
		items : 1,
		autoPlay : true
	});

	//Каруселька ингредиентов
	$(".product__info__ingredients").owlCarousel({
		items : 6,
		nav : true,
		navText : ['<i class="icon-arrow-left"></i>','<i class="icon-arrow-right"></i>'],
		autoPlay : false,
		responsive : {
			0 : {
				items : 3
			},
			480 : {
				items : 4
			},
			768 : {
				items : 6
			},
			992 : {
				items : 8
			},
			1199 : {
				items : 6
			}
		}
	});
	
	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("form#contacts_feedback").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $("form#contacts_feedback").serialize(),
			success: function(data) {
				//$('#order_status').html(data);
				$('#order_status').html('Спасибо, Ваша заявка отправлена!');
			},
			error:  function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		}).done(function() {
			alert("Спасибо за заявку!");
		});
		return false;
	});

	//show/hide mobile nav
	$(".btn-mobile-menu").on("click", function() {
		$(".header-nav").slideToggle();
	});

	//plus qty items to bascket
	$(".add2bascket-qty-plus").on("click", function() {
		var n = $(".add2bascket-qty-input").val();
		$(".add2bascket-qty-input").val(++n);
	});
	//minus qty items to bascket
	$(".add2bascket-qty-minus").on("click", function() {
		var n = $(".add2bascket-qty-input").val();
		$(".add2bascket-qty-input").val(--n);
	});

	//fixed menu on scroll
	$(window).scroll(function () {
		console.log($(this).scrollTop());
		if ($(this).scrollTop() > 60) {
			if ($(window).width() < 1200) {
				$(".header").addClass("fixed_menu");
				$("body").addClass("fixed_menu_fix");
			}
		} else {
			if ($(window).width() < 1200) {
				$(".header").removeClass("fixed_menu");
				$("body").removeClass("fixed_menu_fix");
			}
		}
	});

	//Placeholder.js Doc: https://github.com/NV/placeholder.js/
	$("[placeholder]").textPlaceholder();

	//Попап менеджер FancyBox
	//Документация: http://fancyapps.com/fancybox/
	//<a class="fancybox" rel="group" href="big_image_1.jpg"><img src="small_image_1.jpg" alt="" /></a>
	//<a class="fancybox" rel="group" href="big_image_2.jpg"><img src="small_image_2.jpg" alt="" /></a>
	// $(".fancybox").fancybox();

});