$(document).ready(function() {
	
	// Placeholder
	// Документация: https://github.com/mathiasbynens/jquery-placeholder
	$("input, textarea").placeholder();

	// определение браузера пользователя
	function get_name_browser(){
		// получаем данные userAgent
		var ua = navigator.userAgent;    
		// с помощью регулярок проверяем наличие текста,
		// соответствующие тому или иному браузеру
		if (ua.search(/Chrome/) > 0) return 'Google Chrome';
		if (ua.search(/Firefox/) > 0) return 'Firefox';
		if (ua.search(/Opera/) > 0) return 'Opera';
		if (ua.search(/Safari/) > 0) return 'Safari';
		if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
		// условий может быть и больше.
		// сейчас сделаны проверки только 
		// для популярных браузеров
		return 'Не определен';
	}

	// Временное решение проблемы со шрифтом в Internet Explorer и Safari
	var browser = get_name_browser();
	if(browser == "Safari" || browser == "Internet Explorer") {
		$("nav ul.menu > li > a").css('font-weight', 'normal');
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