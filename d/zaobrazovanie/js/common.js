jQuery(window).load(function() {
    $('#preloader').delay(500).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('#preloader .inner').fadeOut(); // will first fade out the loading animation
});

jQuery(document).ready(function($) { //in jquvery-1.11.1.min.js use this: var $ = jQuery.noConflict();

	GetCount(); //see countdown.js

	/* ==============================================
		Parallax (Stellar)
		http://markdalgleish.com/projects/stellar.js/docs/
	=============================================== */

	$.stellar({
		horizontalScrolling: false,
		verticalOffset: 0
	});

	/* ==============================================
		Animated content
	=============================================== */

	$('.animated').appear(function(){
		var el = $(this);
		var anim = el.data('animation');
		var animDelay = el.data('delay');
		if (animDelay) {
			setTimeout(function(){
				el.addClass( anim + " in" );
				el.removeClass('out');
			}, animDelay);

		}
		else {
			el.addClass( anim + " in" );
			el.removeClass('out');
		}    
	},{accY: -150});  

	/* ==============================================
		Full height home-section
	=============================================== */

	var windowHeight = $(window).height(),
		topSection = $('.form-bg');
	topSection.css('height', windowHeight-150);

	$(window).resize(function(){
		var windowHeight = $(window).height();
		topSection.css('height', windowHeight-150);       
	});

	/* ==============================================
		show/hide menu nav in mobile view
	=============================================== */
    $(".mobile-nav-toggle").on("click", function(event) {
    	if($(window).width() < 992) {
    		$("nav.main").slideToggle();
    	}
    });
    $("ul.top_mnu > li > a").on("click", function(event) {
    	$("ul.top_mnu > li").removeClass("active");
    	$(this).parent().addClass("active");
    	if($(window).width() < 992) {
    		$("nav.main").slideToggle();
    	}
    });

	//Таймер обратного отсчета
	//Документация: http://keith-wood.name/countdown.html
	//<div class="countdown" date-time="2015-01-07"></div>
	// var austDay = new Date($(".countdown").attr("date-time"));
	// $(".countdown").countdown({until: austDay, format: 'yowdHMS'});

    /* ==============================================
        Smooth Scroll on anchors
    =============================================== */  
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top -50
            }, 1000);
            return false;
          }
        }
    });

	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("form").submit(function() {
		$.ajax({
			type: "GET",
			url: "mail.php",
			data: $("form").serialize(),
			success: function(data) {
				//$('#order_status').html(data);
				$('#order_status').html('Спасибо, Ваша заявка на онлайн-курс отправлена');
			},
			error:  function(xhr, str){
				alert('Возникла ошибка: ' + xhr.responseCode);
			}
		}).done(function() {
			alert("Спасибо за заявку!");
			// setTimeout(function() {
			// 	$.fancybox.close();
			// }, 1000);
		});
		return false;
	});

	/* ==============================================
		Scroll To Top
	=============================================== */

	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			$('.back-to-top').fadeIn();
		} else {
			$('.back-to-top').fadeOut();
		}
	});
	// scroll body to 0px on click
	$('.back-to-top').click(function () {
		$('html, body').animate({
			scrollTop: 0,
			easing: 'swing'
		}, 750);
		return false;
	});

	/* ==============================================
		Scrollspy
	=============================================== */

	$('body').scrollspy({
		target: '.top_mnu',
		offset: 150      //px/
	});


});