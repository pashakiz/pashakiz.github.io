$(document).ready(function(){
	$('.show_full_text').on('click', function(){
		$(this).parent().find('.full_text').toggle();
		if ( $(this).text() == "Подробнее" ){
			$(this).html("Свернуть");
			this.title="Свернуть";
		} else {
			$(this).html("Подробнее");
			this.title = "Подробнее";
		}
	});
});