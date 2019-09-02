$(document).ready(function() {
	
	$('.image-container').mouseenter(function(){
		var hoverElem = $('.hover', $(this));
		hoverElem.animate({opacity:1}, {duration: 500}).queue("fx", []);
	});

	$('.image-container').mouseleave(function(){
		var hoverElem = $('.hover', $(this));
		hoverElem.animate({opacity:0}, {duration: 500}).queue("fx", []);
	});


});
