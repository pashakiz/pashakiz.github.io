$(document).ready(function() {
	var timerId = 0;

	//Tooltips
	$('.tooltip-btn').on('mouseenter', function() {
		clearTimeout(timerId);
		$('.tooltip-content').hide();
		$(this).next('.tooltip-content').show();
	});

	$('.tooltip-btn').on('mouseleave', function() {
		console.log('mouseleave1');
		timerId = setTimeout(function() {
			$('.tooltip-content').hide();
			console.log('mouseleave2');
		}, 1500);
	});
	$('.tooltip-content').on('mouseenter', function() {
		clearTimeout(timerId);
		//$(this).show();
	});
	$('.tooltip-content').on('mouseleave', function() {
		$(this).hide();
	});

	//FAQ dropdown
	$('.faq__question').on('click', function() {

		var faqItem = $(this).parent();
		var faqAns = $(this).parent().find('.faq__answer');

		if ( faqItem.hasClass('expand') ) {
			faqItem.removeClass('expand');
			faqAns.slideUp();
		} else {
			faqItem.addClass('expand');
			faqAns.slideDown();
		}

	});

	// Показывает имя файла, выбранного инпутом type="file"
	$('.inputfile').change(function() {
		var filePath, filePathArr, file;
		filePath = $(this).find(".inputfile__input").val();
		filePathArr = filePath.split("\\");
		file = filePathArr[filePathArr.length - 1];
		$(this).find(".inputfile__name").html(file);
	});

	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$('#form-sert').submit(function(e) {

		var name = $(this).find("input[name='name']").val();
		var	email = $(this).find("input[name='email']").val();
		var	cert = $(this).find("input[name='cert']").val();
		var	photo = $(this).find("input[name='photo']").val();

		if (!name || !email || !cert || !photo) {
			alert("Заполните поля формы.");
			return false;
		}

		var email_regexp = /.+@.+\..+/i;
		var email_test = email_regexp.test(email);
		if (!email_test) {
			alert("Введен некоректный Email-адрес.");
			return false;
		}

		var formData = new FormData(this);

		$.ajax({
			type: "POST",
			url: "mail.php",
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function(data, status) {
				//$('#order_status').html('Спасибо, Ваша заявка отправлена!');
				alert('Спасибо! Ваша заявка отправлена!');
				console.log("jquery-ajax-mail-success");
				console.log("data:" + data + "; status: " + status);
			},
			error:  function(jqXHR, exception){
				alert('Возникла ошибка: ' + jqXHR);
				console.log("jqXHR:" + jqXHR + "; exception: " + exception);
			}
		});
		e.preventDefault();
	});

});