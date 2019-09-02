$(document).ready(function(){
	// hide #button-up first
	$("#button-up").hide();
	 
	// fade in #button-up
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 300) {
				$('#button-up').fadeIn('slow');
			} else {
				$('#button-up').fadeOut('fast');
			}
		});

		// animate button opacity on hover
		jQuery('#button-up').mouseover(function(){
			jQuery(this).animate({opacity: 0.65},100);
		}).mouseout(function(){
				jQuery(this).animate({opacity: 1},100);
			});

		// scroll body to 0px on click
		$('#button-up').click(function () {
			$('body,html').animate({scrollTop: 0}, 800);
			return false;
		});
	});
});