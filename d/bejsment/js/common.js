$(document).ready(function() {

	// show/hide mobile nav
	$('.btn-nav-toggle').on('click', function() {
		$('.classifieds-mobile').hide();
		$('.nav').toggle();
	});

	// show/hide mobile search
	$('.btn-search-toggle').on('click', function() {
		$(this).hide();
		$(this).parent().find('.search-mobile').show();
		$('.btn-classifieds-toggle').hide();
		$('.search-mobile__overflow').show();
	});
	$('.search-mobile__overflow').on('click', function() {
		$(this).hide();
		$('.search-mobile').hide();
		$('.btn-search-toggle').show();
		$('.btn-classifieds-toggle').show();
	});

	// show/hide mobile nav (classifieds)
	$('.btn-classifieds-toggle').on('click', function() {
		$('.nav').hide();
		$('.classifieds-mobile').toggle();
	});

	//Placeholder
	//Doc: https://github.com/NV/placeholder.js/
	$("[placeholder]").textPlaceholder();

	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	//$("form").submit(function() {
    //
	//	var name = $(this).find("input[name='name']").val(),
	//		email = $(this).find("input[name='email']").val();
    //
	//	if (!name || !email) {
	//		alert("Заполните поля формы.");
	//		return false;
	//	}
    //
	//	var email_regexp = /.+@.+\..+/i;
	//	var email_test = email_regexp.test(email);
	//	if (!email_test) {
	//		alert("Введен некоректный Email-адрес.");
	//		return false;
	//	}
    //
	//	$.ajax({
	//		type: "POST",
	//		url: "mail.php",
	//		data: $(this).serialize(),
	//		success: function(response) {
	//			//$('#order_status').html(response);
	//			$('#order_status').html('Спасибо, Ваша заявка отправлена!');
	//			console.log("jquery-ajax-mail-success");
	//			console.log('response: ' + response);
	//		},
	//		error:  function(xhr, str){
	//			alert('Возникла ошибка: ' + xhr.responseCode);
	//			console.log('response: ' + xhr);
	//		}
	//	}).done(function() {
	//		alert("Спасибо за заявку!");
	//		setTimeout(function() {
	//			$.fancybox.close();
	//		}, 1000);
	//	});
	//	return false;
	//});

});