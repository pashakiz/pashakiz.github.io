$(document).ready(function() {

	//Placeholder
	//Doc: https://github.com/NV/placeholder.js/
	$("[placeholder]").textPlaceholder();

	//Попап менеджер FancyBox
	//Документация: http://fancyapps.com/fancybox/
	//<a class="fancybox" rel="group" href="big_image_1.jpg"><img src="small_image_1.jpg" alt="" /></a>
	//<a class="fancybox" rel="group" href="big_image_2.jpg"><img src="small_image_2.jpg" alt="" /></a>
	$(".fancybox").fancybox({
		padding: 0
	});

	// Маска ввода телефона
	

	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("form").submit(function() {

		var name = $(this).find("input[name='name']").val(),
			phone = $(this).find("input[name='phone']").val(),
			question = $(this).find("textarea[name='question']").val();

		if (question !== undefined) {

			if (!question || !phone) {
				alert("Заполните поля формы.");
				return false;
			}

		} else {

			if (!name || !phone) {
				alert("Заполните поля формы.");
				return false;
			}
		}

		//маска на телефон

		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize(),
			success: function(response) {
				console.log("jquery-ajax-mail-success");
				console.log('response: ' + response);
				window.location.href = 'http://zem-krym.ru/thank_you.html';
			},
			error:  function(xhr, str){
				alert('Возникла ошибка: ' + xhr);
				console.log('response: ' + xhr);
				window.location.href = 'http://zem-krym.ru/thank_you.html';
			}
		}).done(function() {
			// alert("Спасибо за заявку!");
		});
		return false;
	});

	// Hide/show regions tooltips (mobile)
	$('.tooltip-region__title-btn').on('click', function() {
		if ( $(this).hasClass('active') ) {
			$(this).removeClass('active');
			$(this).parent().next(".tooltip-region").hide();
		} else {
			$(".tooltip-region").hide();
			$(this).addClass('active');
			$(this).parent().next(".tooltip-region").show();
		}
	});
	$('.tooltip-region__title-btn-hide').on('click', function() {
		$(this).closest('.tooltip-region').hide();
		$(this).closest('.tooltip-region').prev().find('.tooltip-region__title-btn').removeClass('active');
	});

});

// SVG map
jQuery(window).load(function() {

	var svgobject = document.getElementById('svgmap');

	if ('contentDocument' in svgobject) {					// У нас действительно там что-то есть?
		var svgdom = jQuery(svgobject.contentDocument);		// Получаем доступ к объектной модели SVG-файла
		var timerId = 0;

		$('.area', svgdom).on('mouseenter', function() {

			clearTimeout(timerId);

			var id = $(this).attr('id');
			$(this).addClass('hover');

			$('.tooltip-region').hide();
			
			if (id == "area-east") {
				$('.tooltip-region_east').show();
			}
			if (id == "area-west") {
				$('.tooltip-region_west').show();
			}
			if (id == "area-south") {
				$('.tooltip-region_south').show();
			}
			if (id == "area-mountain") {
				$('.tooltip-region_mountain').show();
			}
		});

		if ($(window).width() > 1200) { //for Desktops
			$('.tooltip-region').on('mouseenter', function() {
				$('.tooltip-region').addClass('hover');
				$('.area', svgdom).removeClass('hover');
			});
			$('.tooltip-region').on('mouseleave', function() {
				$(this).hide();
				$('.tooltip-region').removeClass('hover');
			});
		}

		$('.area', svgdom).on('mouseleave', function() {

			$(this).removeClass('hover');
			var id = $(this).attr('id');
			console.log('.area not hover...');

			timerId = setTimeout(function() {
				if (id == "area-east") {
					if ( !$('.tooltip-region_east').hasClass('hover') ) {
						$('.tooltip-region_east').hide();
						console.log('.area not hover: .tooltip-region_east hide');
					}
				}
				if (id == "area-west") {
					if ( !$('.tooltip-region_west').hasClass('hover') ) {
						$('.tooltip-region_west').hide();
						console.log('.area not hover: .tooltip-region_west hide');
					}
				}
				if (id == "area-south") {
					if ( !$('.tooltip-region_south').hasClass('hover') ) {
						$('.tooltip-region_south').hide();
						console.log('.area not hover: .tooltip-region_south hide');
					}
				}
				if (id == "area-mountain") {
					if ( !$('.tooltip-region_mountain').hasClass('hover') ) {
						$('.tooltip-region_mountain').hide();
						console.log('.area not hover: .tooltip-region_mountain hide');
					}
				}
			}, 1500);
		});
		
	}
});