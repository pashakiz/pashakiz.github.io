$(document).ready(function() {

	//Рэйтинг
	//Документауция: http://habrahabr.ru/post/132807/
	$("div.rating").rating({
		fx: 'float',
		image: 'img/stars.png',
		width: 14,
		loader: 'img/ajax-loader.gif',
		url: 'rating.php',
		callback: function(responce){
			this.vote_success.fadeOut(2000);
			if(responce.msg) alert(responce.msg);
		}
	});

	//Каруселька
	//Документация: http://owlgraphic.com/owlcarousel/
	$(".carousel").owlCarousel({
		items : 1,
		navigation : true,
		navigationText : ['<div class="icon arrow-left-sm"></div>','<div class="icon arrow-right-sm"></div>'],
		itemsDesktop : [1199,1],
		itemsDesktopSmall : [979,1],
		itemsTablet : [768,1],
		itemsMobile : [479,1],
		autoPlay : false,
		slideSpeed : 200,
		paginationSpeed : 800,
		itemsScaleUp : false
	});
/*

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
*/
});