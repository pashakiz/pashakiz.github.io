$(document).ready(function() {

	// Native scroll with custom scrollbar
	// init in HTML: data-simplebar-direction="vertical"
	// https://github.com/Grsmto/simplebar
	$(".content").simplebar({ autoHide: false });
	$(".sidebarright__inner").simplebar();
	$(".chain-messages-dialog__messages").simplebar();
	// $(".chain-messages-dialog__textarea").simplebar();

	// customSelect
	// http://adam.co/lab/jquery/customselect/
	// https://github.com/adamcoulombe/jquery.customSelect
	$("select").customSelect();
	$("#orderpublish").hide();

	// DatePicker PickMeUp
	// https://github.com/nazar-pc/PickMeUp
	$('.datepicker').pickmeup({
		format  : 'd.m.Y'
	});
	$('.datepicker-range').pickmeup({
		mode	: 'range'
	});

	// Tickets: Ответить
	$(".ticket__support-reply").on("click", function() {
		$(".ticket__addmessage").slideDown();
	});

	// News: Ответить
	$(".news__comment-reply-btn").on("click", function() {
		$(".news__comment-reply").slideDown();
	});
	// News: показать все N комментариев
	$(".news__toggle-comments").on("click", function() {
		if ( $(this).hasClass("active") ) {
			$(".news__comments-hidden").hide();
			$(this).removeClass("active");
			$(this).html('Показать все <span class="news__comments-count">1000</span> комментарии');
		} else {
			$(".news__comments-hidden").show();
			$(this).addClass("active");
			$(this).html('Скрыть комментарии');
		}
	});
	// News: Likes
	$(".news__likes").on("click", function() {
		var n = $(this).children('.news__likes-counter').html();
		$(this).children('.news__likes-counter').html(++n);
	});

	// FAQ user settings
	$('.user__settings').on('click', function() {
		$(this).children('.user__settings-inner').toggle();
	});

	// Удаление площадки ajax (Агент)
	$(".btn-popup-delete-area").on("click", function() {
		console.log("ajax-delete-area-id");
	});
	// Удаление заявки (Рекламодатель)
	var btn_delete_offer = ""; // global
	$(".btn-delete-offer").on("click", function() {
		btn_delete_offer = $(this);
	});
	$(".btn-popup-delete-offer").on("click", function() {
		btn_delete_offer.closest(".content__body__areaitem").slideUp();
		setTimeout(function() {
			btn_delete_offer.closest(".content__body__areaitem").remove();
			btn_delete_offer = ""; // global clean
		}, 1000);
		$.fancybox.close();
	});
	$(".btn-popup-cancel").on("click", function() {
		$.fancybox.close();
	});

	// Добавление заявки в Избранное (Рекламодатель)
	$(".btn-offer-favorite").on("click", function() {
		if ( $(this).children("i").hasClass("icon-favorite") ) { //add to favorites
			$(this).children("i").removeClass("icon-favorite");
			$(this).children("i").addClass("icon-favorite-fill");
		} else { //remove from favorites
			$(this).children("i").removeClass("icon-favorite-fill");
			$(this).children("i").addClass("icon-favorite");
		}
	});
	// Удаление площадки из Избранного (Рекламодатель)
	var btn_delete_favorite = ""; // global
	$(".btn-favorite-delete").on("click", function() {
		btn_delete_favorite = $(this);
	});
	$(".btn-popup-delete-favorite").on("click", function() {
		btn_delete_favorite.closest(".content__body__areaitem").slideUp();
		setTimeout(function() {
			btn_delete_favorite.closest(".content__body__areaitem").remove();
			btn_delete_favorite = ""; // global clean
		}, 1000);
		$.fancybox.close();
	});

	// agent/my-areas/add
	// textarea maxlength counter
	// textareaMaxlengthUpdate();
	$(".addnote__textarea").on("keyup", function() {
		textareaMaxlengthUpdate();
	});
	function textareaMaxlengthUpdate() {
		var textarea = $(".addnote__textarea"),
			counter = $('.addnote__textarea-maxlength-counter'),
			maxlength = textarea.attr('maxlength'),
			current = textarea.val().length;

		counter.html(maxlength - current);
	}

	// agent/my-areas/add
	// выбор соц.сети
	$('.addnote__row_youtube').hide();
	$('.radiobutton__notesocial').on('click', function() {
		var type = $(this).children(":radio").val();
		if (type == 'youtube') {
			$(".addnote__control-btn").hide();
			$(".addnote__control-btn_link").show();
			$('.addnote__row_youtube').show();
			$('.addnote__row_all').hide();
			if ( $('select.addnote__row_notetype').val() == 'youtube-text' ) {
				$('.addnote__row_all').show();
			}
			$(".addnote__textarea").attr('maxlength', '100');
			textareaMaxlengthUpdate();
		}
		if (type == 'vk') {
			$('.addnote__row_youtube').hide();
			$('.addnote__row_all').show();
			$(".addnote__control-btn").hide();
			$(".addnote__control-btn_link").show();
			$(".addnote__control-btn_photo").show();
			$(".addnote__control-btn_smiles").show();
			$(".addnote__control-btn_video").show();
			$(".addnote__control-btn_voting").show();
			$(".addnote__textarea").attr('maxlength', '2000');
			textareaMaxlengthUpdate();
		}
		if (type == 'instagram') {
			console.log('instagram');
			$('.addnote__row_youtube').hide();
			$('.addnote__row_all').show();
			$(".addnote__control-btn").hide();
			$(".addnote__control-btn_photo").show();
			$(".addnote__control-btn_smiles").show();
			$(".addnote__textarea").attr('maxlength', '2000');
			textareaMaxlengthUpdate();
		}
		if (type == 'twitter') {
			console.log('twitter');
			$('.addnote__row_youtube').hide();
			$('.addnote__row_all').show();
			$(".addnote__control-btn").hide();
			$(".addnote__control-btn_link").show();
			$(".addnote__control-btn_photo").show();
			$(".addnote__textarea").attr('maxlength', '140');
			textareaMaxlengthUpdate();
		}
		if (type == 'ok' || type == 'googleplus' || type == 'facebook' ) {
			$('.addnote__row_youtube').hide();
			$('.addnote__row_all').show();
			$(".addnote__control-btn").hide();
			$(".addnote__control-btn_link").show();
			$(".addnote__control-btn_photo").show();
			$(".addnote__control-btn_video").show();
			$(".addnote__textarea").attr('maxlength', '2000');
			textareaMaxlengthUpdate();
		}
	});
	// выбор типа рекламы для youtube
	$('select.addnote__row_notetype').on('change', function() {
		var type = $(this).val();
		if (type == 'youtube-text') {
			$('.addnote__row_all').show();
			$(".addnote__textarea").attr('maxlength', '100');
			textareaMaxlengthUpdate();
		}
		if (type == 'youtube-preroll') {
			$('.addnote__row_all').hide();
			$(".addnote__textarea").attr('maxlength', '2000');
			textareaMaxlengthUpdate();
		}
		if (type == 'youtube-brand') {
			$('.addnote__row_all').hide();
			$(".addnote__textarea").attr('maxlength', '2000');
			textareaMaxlengthUpdate();
		}
	});

	// agent/my-areas/add
	// upload photo
	function uploadPhoto(input) {
	if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function(e) {
				$('img.addphoto__img').attr('src', e.target.result);
			}

			reader.readAsDataURL(input.files[0]);
		}
	}
	$("#uploadphoto").change(function(){
		uploadPhoto(this);
		$(".addnote__row_photo").slideDown();
	});
	// personal settings
	$("#upload-avatar").change(function(){
		uploadPhoto(this);
	});
	// agent/my-areas/add
	// remove uploaded photo
	$(".btn-addphoto-remove").on("click", function() {
		function uploadPhotoClearHtml() {	
			$("#uploadphoto").val("");
			$('img.addphoto__img').attr('src', "");
		}
		$(this).parent().parent().slideUp();
		setTimeout(uploadPhotoClearHtml, 1000);
	});

	// agent/my-areas/add
	// show video input
	$(".addnote__control-btn_video").on("click", function() {
		$(".addnote__row_video").slideToggle();
	});
	// agent/my-areas/add
	// add video
	$("input.addvideourl").on("blur", function() {
		var url = $(this).val(),
			youtube_arr = url.split("youtube.com/watch?v="),
			youtube_id = "";
		if (youtube_arr[0] == url) {
			youtube_arr = url.split("youtu.be/");
		}

		youtube_id = youtube_arr[1];
		
		if (youtube_arr[0] == url) { // значит ссылка не содержала ни "youtu.be/" ни "youtube.com/watch?v="
			youtube_id = "";
		}

		if (youtube_id != "") {	
			$(this).parent().find(".addvideo__video-container").slideDown();
			$(this).parent().find(".addvideo__video-responsive").append('<iframe class="addvideo__item" src="https://www.youtube.com/embed/'+youtube_id+'" frameborder="0" allowfullscreen></iframe>');
		} else {
			$(this).parent().find(".addvideo__video-container").slideUp();
		}
	});

	// show voting inputs
	$(".addnote__control-btn_voting").on("click", function() {
		$(".addnote__row_voting").slideToggle();
	});
	// agent/my-areas/add
	//добавить вариант опроса
	$(".btn-add-voting-answer").on("click", function() {
		var n = $("input.voting-answer").length;
		n++;
		$(this).parent().append('<input class="voting-answer" type="text" name="voting-answer'+n+'" placeholder="Вариант '+n+'">');
	});
	// agent/my-areas/add
	//удалить вариант опроса (НО оставить скажем 2 инпута неудаляемыми)
	$(".btn-remove-voting-answer").on("click", function() {
		var n = $("input.voting-answer").length;
		if (n > 2) {
			$('input[name="voting-answer'+n+'"]').remove();
		}
	});

	//Custom RadioButtons
	$(".radiobutton").on("click", function() {
		// обнуляем все радиобатоны и кастомные иконки
		$(".radiobutton").children(":radio").prop("checked", false);
		$(".radiobutton").children(".icon-radiobutton").removeClass("checked");
		// устанавливаем текущий RB в checked
		$(this).children(":radio").prop("checked", true);
		$(this).children(".icon-radiobutton").addClass("checked");
	});

	// show additional input for Google+ (page: agent/my-areas/add)
	$(".area-add__show-input").on("click", function() {
		$(".area-add__added-input").slideDown();
	});
	$(".area-add__hide-input").on("click", function() {
		$(".area-add__added-input").slideUp();
	});

	// Рекламодатель: Поиск площадки
	// выбор типа соц.сети
	$('.search-areas_all').hide();
	$('.search-areas_default').show();
	$('select.areatype').on('change', function() {
		var type = $(this).val();
		if (type == 'youtube') {
			$('.search-areas_all').hide();
			$('.search-areas_youtube').show();
		}
		if (type == 'vk') {
			$('.search-areas_all').hide();
			$('.search-areas_vk').show();
		}
		if (type == 'instagram') {
			$('.search-areas_all').hide();
			$('.search-areas_instagram').show();
		}
		if (type == 'ok' || type == 'googleplus' || type == 'twitter' || type == 'facebook' ) {
			$('.search-areas_all').hide();
			$('.search-areas_default').show();
		}
	});
	
	// slider (input range)
	// https://github.com/seiyria/bootstrap-slider
	$("input.slider").slider();
	$("input.slider").on("slide", function(slideEvt) {
		var val = slideEvt.value,
			labels = $(this).attr('data-slider-labels'),
			arr = labels.split(",", 2);
		if (val < 51) {
			val = 100 - val;
			val += "% "+arr[0];
		} else {
			val += "% "+arr[1];
		}
		$(this).parent().find(".search-areas__rowblock-slider-value").text(val);
	});

	// Рекламодатель: Поиск площадки
	// Расширенные настройки поиска площадок
	$(".btn-advanced-settings").on("click", function() {
		// var type = $('select.areatype').val();
		$(".search-areas_hidden").slideToggle();
	});

	// Custom CheckBoxes (default)
	$(".checkbox_default").on("click", function() {
		var current_checkbox = $(this).children(":checkbox");
		if (current_checkbox.prop("checked")) {
			// Снимаем отметку с checkbox'а
			current_checkbox.prop("checked", false);
			$(this).children(".checkbox__icon").removeClass("icon-accept");
		} else {
			// включаем чекбокс
			current_checkbox.prop("checked", true);
			// добавляем нужный класс иконке
			$(this).children(".checkbox__icon").addClass("icon-accept");
		};
	});

	// Custom CheckBoxes (turn, notification page)
	$(".checkbox_turn").on("click", function() {
		var current_checkbox = $(this).children(":checkbox");
		if (current_checkbox.prop("checked")) {
			// Снимаем отметку с checkbox'а
			current_checkbox.prop("checked", false);
			$(this).children(".checkbox__icon").addClass("icon-turn-off");
			$(this).children(".checkbox__icon").removeClass("icon-turn-on");
		} else {
			// включаем чекбокс
			current_checkbox.prop("checked", true);
			// добавляем нужный класс иконке
			$(this).children(".checkbox__icon").addClass("icon-turn-on");
			$(this).children(".checkbox__icon").removeClass("icon-turn-off");
		};
	});

	// Рекламодатель: Поиск площадки
	// Select areatopics: Custom CheckBoxes (multiselect)
	$(".checkbox_multiselect").on("click", function() {
		var current_checkbox = $(this).children(":checkbox");
		if (current_checkbox.prop("checked")) {
			// Снимаем отметку с checkbox'а
			current_checkbox.prop("checked", false);
			// remove icon
			$(this).children(".checkbox__icon").removeClass("icon-accept");
		} else {
			// Снимаем отметку с checkbox'а
			current_checkbox.prop("checked", true);
			// add icon
			$(this).children(".checkbox__icon").addClass("icon-accept");
		};
	});
	// Add areatopics: Custom CheckBoxes multiselect submit
	$(".areatopics-popup__btn-ok").on("click", function() {
		var html1 = "<div class='checkbox checkbox_multiselect-true' data-checkbox-multiselect-value='",
			html2 = "'><span class='checkbox__title'>",
			html3 = "</span><i class='checkbox__icon icon-close'></i></div>",
			out = "";

		$(".checkbox_multiselect").children(":checkbox:checked").each(function(){ // only checked checkboxes
			var value = $(this).val(),
				text = $(this).parent().children(".checkbox__title").text();

			out += html1 + value + html2 + text + html3;
		});

		$(".search-areas__row-inner_cbms-true").html(out);
		$.fancybox.close();
	});
	// Remove areatopics: Custom CheckBoxes .checkbox_multiselect-true (multiselect remove)
	$(".search-areas__row-inner_cbms-true").on("click", ".checkbox_multiselect-true", function() {
		var chekbox_value = $(this).attr('data-checkbox-multiselect-value');
		$("input[value='"+chekbox_value+"']").prop("checked", false);
		$("input[value='"+chekbox_value+"']").parent().children(".checkbox__icon").removeClass("icon-accept");
		$(this).remove();
	});

	// MESSAGES (begin) -------------------------------------------------------------------
	// show messages
	$(".sidebarleft__header__controls__item .icon-message").on("click", function() {
		$(".sidebarleft__header__controls__item").removeClass("active");
		$(".content").addClass("move");
		$(".sidebarleft").addClass("move");
		$(".sidebarright").addClass("move");
	});
	// show messages (написать агенту конкретному), page: advertiser_campaigns_offers-*.html
	$(".message2agent").on("click", function() {
		$(".sidebarleft__header__controls__item").removeClass("active");
		$(".content").addClass("move");
		$(".sidebarleft").addClass("move");
		$(".sidebarright").addClass("move");
		console.log('show-agent-in-dialogs');
		$(".chain-messages-dialog").show();
	});
	// hide messages
	$(".sidebarright__close").on("click", function() {
		$(".content").removeClass("move");
		$(".sidebarleft").removeClass("move");
		$(".sidebarright").removeClass("move");
	});
	$(".sidebarleft__header__controls__item i").on("click", function() {
		if ( !$(this).parent().hasClass("active") ) {
			$(".sidebarleft__header__controls__item").removeClass("active");
			$(this).parent().addClass("active");
			$(".content").on("click", function() {
				$(".sidebarleft__header__controls__item").removeClass("active");
			});
		} else {
			$(this).parent().removeClass("active");
		}
	});
	// Показ диалога сообщений
	$(".chain-messages").on("click", function() {
		console.log("ajax-show-chain-messages-id");
		$(".chain-messages-dialog").show();
	});
	// Скрыть диалог сообщений
	$(".btn-dialog-close").on("click", function() {
		$(".chain-messages-dialog").hide();
	});
	// Удаление цепочки сообщений
	$(".chain-messages__del").on("click", function() {
		console.log("ajax-delete-chain-messages-id");
		$(this).parent().slideUp();
	});
	// MESSAGES (end) -------------------------------------------------------------------

	// Bootstrap: tooltip.js v3.3.6 http://getbootstrap.com/javascript/#tooltip
	$('[data-toggle="tooltip"]').tooltip();

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


	// INDEX PAGE (begin) ------------------------------------------------
	//Плавный скролл до блока on index page
	//Документация: https://github.com/flesler/jquery.scrollTo
	$("a.howitworkslnk").on("click", function() {
		$.scrollTo($("#howitworks"), 800, {
			offset: 0
		});
	});
	$("a.helplnk").on("click", function() {
		$.scrollTo($("#help"), 800, {
			offset: 0
		});
	});

	//Expand FAQ on index page
	$(".question").on("click", function() {
		var e = $(this).parent().find(".answer");
		if ( e.hasClass("js-expand") ) {
			e.slideUp();
			e.removeClass("js-expand");
		} else {
			e.slideDown();
			e.addClass("js-expand");
		}
	});

	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("form#login").submit(function() {

		var	email = $(this).find("input[name='email']").val(),
			pass = $(this).find("input[name='pass']").val();

		if (!email || !pass) {
			$(".form-message").html("Заполните поля формы.");
			$(".form-message").addClass("error");
			$(".form-message").slideDown();
			return false;
		}

		var email_regexp = /.+@.+\..+/i;
		var email_test = email_regexp.test(email);
		if (!email_test) {
			$(".form-message").html("Введен некоректный Email-адрес.");
			$(".form-message").addClass("error");
			$(".form-message").slideDown();
			return false;
		}

		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $("form").serialize(),
			success: function(response) {
				$(".form-message").html("OK message");
				$(".form-message").removeClass("error");
				$(".form-message").slideDown();
			},
			error:  function(xhr, str){
				$(".form-message").html("Error message");
				$(".form-message").addClass("error");
				$(".form-message").slideDown();
			}
		}).done(function() {
			// alert("Спасибо за заявку!");
			// setTimeout(function() {
			// 	$.fancybox.close();
			// }, 1000);
		});
		return false;
	});
	$("form#registration").submit(function() {

		var name = $(this).find("input[name='name']").val(),
			email = $(this).find("input[name='email']").val(),
			pass = $(this).find("input[name='pass']").val();

		if (!name || !email|| !pass) {
			$(".form-message").html("Заполните поля формы.");
			$(".form-message").addClass("error");
			$(".form-message").slideDown();
			return false;
		}

		var email_regexp = /.+@.+\..+/i;
		var email_test = email_regexp.test(email);
		if (!email_test) {
			$(".form-message").html("Введен некоректный Email-адрес.");
			$(".form-message").addClass("error");
			$(".form-message").slideDown();
			return false;
		}

		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $("form").serialize(),
			success: function(response) {
				$(".form-message").html("OK message");
				$(".form-message").removeClass("error");
				$(".form-message").slideDown();
			},
			error:  function(xhr, str){
				$(".form-message").html("Error message");
				$(".form-message").addClass("error");
				$(".form-message").slideDown();
			}
		}).done(function() {
			// alert("Спасибо за заявку!");
			// setTimeout(function() {
			// 	$.fancybox.close();
			// }, 1000);
		});
		return false;
	});
	$("form#resetpass").submit(function() {

		var email = $(this).find("input[name='email']").val();

		if (!email) {
			$(".form-message").html("Заполните поля формы.");
			$(".form-message").addClass("error");
			$(".form-message").slideDown();
			return false;
		}

		var email_regexp = /.+@.+\..+/i;
		var email_test = email_regexp.test(email);
		if (!email_test) {
			$(".form-message").html("Введен некоректный Email-адрес.");
			$(".form-message").addClass("error");
			$(".form-message").slideDown();
			return false;
		}

		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $("form").serialize(),
			success: function(response) {
				$(".form-message").html("Запрос отправлен, загляните на почту!");
				$(".form-message").removeClass("error");
				$(".form-message").slideDown();
			},
			error:  function(xhr, str){
				$(".form-message").html("Пользователь с таким email не найден!");
				$(".form-message").addClass("error");
				$(".form-message").slideDown();
			}
		}).done(function() {
			// alert("Спасибо за заявку!");
			// setTimeout(function() {
			// 	$.fancybox.close();
			// }, 1000);
		});
		return false;
	});
	// INDEX PAGE (end) ------------------------------------------------

});