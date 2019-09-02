	$(document).ready(function() {

		$('.input-text').each(function(){
			$(this).blur();
			if($(this).val() != '') {
				$(this).prev().addClass('hide');
				$(this).parent().find('.clear-text').addClass('ct-show');
			}
		});
		
		$('.input-text').blur(function() {
			if ($(this).val() == '') $(this).prev().removeClass('hide');
		});
		
		$('.input-text').focus(function() {
			$(this).prev().addClass('hide');
		});
		
		$('.input-text').mouseover(function() {
			if ($(this).val() != '') {
				$(this).prev().addClass('hide');
				$(this).parent().find('.clear-text').addClass('ct-show');
			}
		});

		$('.clear-text').click(function() {
			$(this).parent().find('.input-text').val('').focus();
			$(this).removeClass('ct-show');

		});
		
		$('.input-text').keyup(function() {
			if($(this).val() != '') {
				$(this).parent().find('.clear-text').addClass('ct-show');
			}
			else {$(this).parent().find('.clear-text').removeClass('ct-show');}
		});
		
		
		$('.main-slider').each(function() {
	        $(this).jCarouselLite({
	            btnNext: $(this).find('.main-slider-next'),
	            btnPrev: $(this).find('.main-slider-prev'),
	            visible: 1,
		        circular:true,
		        auto:3000,
		        speed:600,
		        hoverPause:true
		        
	        });
	    });
		
		
		$('.product-more-slider-on').each(function() {
	        $(this).jCarouselLite({
	            btnNext: $(this).parent().parent().find('.product-more-slider-next'),
	            btnPrev: $(this).parent().parent().find('.product-more-slider-prev'),
	            visible: 4,
		        circular:true,
		        auto:false,
		        speed:600,
		        hoverPause:false
		        
	        });
	    });
		
			
		//--Определение наибольшей высоты изображения в строке таблицы и установка этой высоты для блока-родителя изображения (чтобы текст под изображениями выравнивался по одной линии)---НАЧАЛО---
			$('.img-line-same-height').each(function(index) {
				var $trImg = $(this).find('img'),
					$imgNum = $trImg.length,
					$imgMaxHeight = 0,
					i = 0,
					$imgHeight,
					$curImg;
				
					
				$trImg.bind('load', function(){
					
					
					if ( $trImg.filter(function (index, $trImg) {
				        return $($trImg).height();
				      }).length === $trImg.length ) {
						
						
						while (i < $imgNum) {
							
							$curImg = $trImg.eq(i);
							$imgHeight = $curImg.height();
							if ($imgHeight > $imgMaxHeight){$imgMaxHeight=$imgHeight;}

							//console.log( 'TR index=',index, 'Length= ',$imgNum, 'i=',i, 'Height=', $curImg.height(), $curImg);
							
							i++;
						}
						
						
						$trImg.parent().parent().css('height', $imgMaxHeight+'px');
						//console.log( $trImg.parent().parent());
						
					
					}

						
				}).each(function(){
				    if(this.complete) $(this).trigger('load');
				});

				

			});
			//--Определение наибольшей высоты изображения в строке таблицы и установка этой высоты для блока-родителя изображения (чтобы текст под изображениями выравнивался по одной линии)---КОНЕЦ---
			
			
			
			
			
	});
  
  function oum_audio()
  {
     document.write('<object type="application/x-shockwave-flash" data="http://flv-mp3.com/i/pic/ump3player_500x70.swf" height="0" width=""><param name="wmode" value="transparent" /><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="movie" value="http://flv-mp3.com/i/pic/ump3player_500x70.swf" /><param name="FlashVars" value="way=http://flv-mp3.com/i/pic/sample.mp3&amp;swf=http://flv-mp3.com/i/pic/ump3player_500x70.swf&amp;w=&amp;h=0&amp;time_seconds=0&amp;autoplay=0&amp;q=&amp;skin=orange&amp;volume=70&amp;comment=Слушать аудиозапись" /></object>');
  }

	
	

