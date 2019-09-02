$(document).ready(function() {

	// Placeholder
	// Документация: https://github.com/mathiasbynens/jquery-placeholder
	$("input, textarea").placeholder();

	$(".datepicker").pickmeup();

	// Custom select: http://adam.co/lab/jquery/customselect/
	//$(".custom-select").customSelect();

	// Paralax: http://markdalgleish.com/projects/stellar.js/docs/
	$.stellar({
		horizontalScrolling: false,
		verticalOffset: 0
	});

	/*var windowHeight = $(window).height(),
		topSection = $("section.choice-program .illustration");
	topSection.css('height', windowHeight+350);

	$(window).resize(function(){
		var windowHeight = $(window).height();
		topSection.css('height', windowHeight+350);       
	});*/

	// Показать/скрыть "Подробнее"
	$(".btn-more").click(function () {
		$(this).parent().find(".more").slideToggle();
	});

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox();

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
	// hide #button-up first
	$("#top").hide();
	 
	// fade in #button-up
	$(function () {
		if($(window).width() > 1200) {
			$(window).scroll(function () {
				if ($(this).scrollTop() > 300) {
					$('#top').fadeIn('slow');
				} else {
					$('#top').fadeOut('fast');
				}
			});
		};

		// scroll body to 0px on click
		$('#top').click(function () {
			$('body,html').animate({scrollTop: 0}, 800);
			return false;
		});
	});

	// Маска ввода телефона
	$(".js-phone-mask").mask("+7 (999) 9999999");

	// Маска ввода имени
	$('.js-name-mask').on('keypress', function(key) {
		
		var spase, dash, bigLetters, smallLetters, ruLetters;

		spase = (key.charCode == 32); // " "
		dash = (key.charCode == 45); // "-"
		bigLetters = (key.charCode >= 65 && key.charCode <= 90); // ZZZ
		smallLetters = (key.charCode >= 97 && key.charCode <= 122); // zzz
		ruLetters = (key.charCode >= 1040 && key.charCode <= 1105); // ЯЯЯяяя

		if(!spase && !dash && !bigLetters && !smallLetters && !ruLetters) {
			return false;
		}
	});

	// Показывает имя файла, выбранного инпутом (в области кастомного инпута)
	$('.filearea').change(function() {
		var filePath, filePathArr, file;
		filePath = $(this).find(".inputfile").val();
		filePathArr = filePath.split("\\");
		file = filePathArr[filePathArr.length - 1];

			if (file != "") {
				$(this).find(".label").hide();
				$(this).find(".filename").html(file);
			} else {
				$(this).find(".label").show();
				$(this).find(".filename").html("");
			}
	});
	
	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/, https://toster.ru/q/252913
	$("form").submit(function(e) {
		var whichForm = $(this).find("input[name='formtype']").val(),
			thisForm = $(this);

		if (whichForm == "callback") {

			var name = $(this).find("input[name='name']").val(),
				phone = $(this).find("input[name='phone']").val();

			if (!name || !phone) {
				alert("Заполните поля формы.");
			}
		}

		if (whichForm == "getaudit") {
			var name = $(this).find("input[name='name']").val(),
				phone = $(this).find("input[name='phone']").val(),
				email = $(this).find("input[name='email']").val(),
				file = $(this).find("input[name='file']").val();

			if (!name || !phone || !email || !file) {
				alert("Заполните поля формы.");
			}
		}
		if (whichForm == "programdescr") {
			var name = $(this).find("input[name='name']").val(),
				phone = $(this).find("input[name='phone']").val(),
				email = $(this).find("input[name='email']").val();

			if (!name || !phone || !email) {
				alert("Заполните поля формы.");
			}
		}
		if (whichForm == "programstart") {
			var name = $(this).find("input[name='name']").val(),
				phone = $(this).find("input[name='phone']").val(),
				email = $(this).find("input[name='email']").val(),
				file = $(this).find("input[name='file']").val();

			if (!name || !phone || !email || !file) {
				alert("Заполните поля формы.");
			}
		}
		var formData = new FormData(this);
		$.ajax({
			type:'POST',
			url: 'mail.php',
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
			success:function(data, status) {
				thisForm.parent().slideToggle();
				$('.order_status').html("Спасибо, Ваша заявка отправлена!");
				$('.order_status').css({'margin-top' : '70px', 'margin-bottom' : '50px'});
				console.log("data:" + data + "; status: " + status);
			},
			error: function (jqXHR, exception) {
				$('.order_status').html("Ошибка отправки формы! <br><a href='/'>Обновите страницу</a> и попробуйте снова.");
				console.log("jqXHR:" + jqXHR + "; exception: " + exception);
			}
		});
		e.preventDefault();
	});

});