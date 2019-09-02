$(document).ready(function() {
	
	$('.btn').mouseenter(function(){
		var pElem = $('.hover_text', $(this)),
			hoverElem = $('.hover', $(this)),
			imgElem = $('img', $(this));

		hoverElem.animate({'right':'0px','top':'0px'}).queue("fx", []);
		imgElem.animate({'right':'128px','top':'50px'})
			.animate({'width':'55px','height':'55px'}, {queue:false}).queue("fx", []);
		pElem.animate({opacity:1}, {duration: 2000}).css({'display':'block'}).queue('fx', []);
		/*pElem.fadeIn(1500).queue('fx', []);*/
		/*pElem.animate({opacity:1}, {duration: 'slow'}, function(){
			$(this).btn().find('.hover_text').css({'display':'block'});
			}).queue('fx', []);*/
		return false;
	});

	$('.btn').mouseleave(function(){
		var pElem = $('.hover_text', $(this)),
			hoverElem = $('.hover', $(this)),
			imgElem = $('img', $(this));

		pElem.animate({opacity:0}, {duration: 100}).css({'display':'none'}).queue('fx', []);
		/*pElem.fadeOut(500).queue('fx', []);*/
		/*pElem.animate({opacity:0}, {duration: 'slow'}, function(){
			$(this).btn().find('.hover_text').css({'display':'none'});
			}).queue('fx', []);*/
		hoverElem.animate({'right':'250px','top':'150px'}).queue('fx', []);
		imgElem.animate({'right':'14px','top':'14px'})
			.animate({'width':'31px','height':'31px'}, {queue:false}).queue('fx', []);
		return false;
	});


	$('.btn1').on('click', function(){
		
		if ($(this).parent().parent().find('.c2').is(':visible'))
			$(this).parent().parent().find('.c2').slideToggle();

		if ($(this).parent().parent().find('.c3').is(':visible'))
			$(this).parent().parent().find('.c3').slideToggle();

		if ($(this).parent().parent().find('.c1').is(':hidden')) {
			$(this).parent().parent().find('.c1').slideDown();
			$('html, body').animate({ scrollTop: $(this).parent().parent().find(".c1").offset().top + $('window').height() }, 2000);
		} else {
			$(this).parent().parent().find('.c1').slideUp();
			$('body,html').animate({scrollTop: 0}, 2000);
		}
	});

	$('.btn2').on('click', function(){

		if ($(this).parent().parent().find('.c1').is(':visible'))
			$(this).parent().parent().find('.c1').slideToggle();
		
		if ($(this).parent().parent().find('.c3').is(':visible'))
			$(this).parent().parent().find('.c3').slideToggle();

		if ($(this).parent().parent().find('.c2').is(':hidden')) {
			$(this).parent().parent().find('.c2').slideDown();
			$('html, body').animate({ scrollTop: $(this).parent().parent().find(".c2").offset().top + $('window').height() }, 2000);
		} else {
			$(this).parent().parent().find('.c2').slideUp();
			$('body,html').animate({scrollTop: 0}, 2000);
		}
	});

	$('.btn3').on('click', function(){

		if ($(this).parent().parent().find('.c1').is(':visible'))
			$(this).parent().parent().find('.c1').slideToggle();
		
		if ($(this).parent().parent().find('.c2').is(':visible'))
			$(this).parent().parent().find('.c2').slideToggle();

		if ($(this).parent().parent().find('.c3').is(':hidden')) {
			$(this).parent().parent().find('.c3').slideDown();
			$('html, body').animate({ scrollTop: $(this).parent().parent().find(".c3").offset().top + $('window').height() }, 2000);
		} else {
			$(this).parent().parent().find('.c3').slideUp();
			$('body,html').animate({scrollTop: 0}, 2000);
		}
	});

});
