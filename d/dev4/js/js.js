$(document).ready(function(){

        //запуск счётчика до акции
	GetCount();

        //выпадающие ответы на вопросы
        $('.question').click(function() {
                $(this).next('.answer').slideToggle(300);
                $(this).toggleClass('expanded');
                if ( $(this).hasClass('expanded') ){
                        $(this).find('.arrow').css({'background-image' : 'url(http://lubus.ru/dev4/img/icon-up.png)'}); /*.html("&#9660;");*/
                } else {
                        $(this).find('.arrow').css({'background-image' : 'url(http://lubus.ru/dev4/img/icon-down.png)'}); /*.html("&#9650;");*/
                }
        });

        //листалка отзывов
        $(".comment-wrapper").jcarousel({
                        scroll: 1,
                        wrap: 'circular'
        });

        //клик по бонусу
        $('.form_block a').on('click', function(){
                $(this).parent().parent().parent().find('[name=name]').focus();
        });
});

dateFuture = new Date(2014,05,15,0,0,0);

function GetCount(){

        dateNow = new Date();  //grab current date
        amount = dateFuture.getTime() - dateNow.getTime(); //calc milliseconds between dates
        delete dateNow;

        // time is already past
        if(amount < 0){
                /*document.getElementById('count-days').innerHTML="00";
                document.getElementById('count-hours').innerHTML="00";
                document.getElementById('count-mins').innerHTML="00";
                document.getElementById('count-secs').innerHTML="00";*/
                $(".count-days").html("00");
                $(".count-hours").html("00");
                $(".count-mins").html("00");
                $(".count-secs").html("00");
        }
        // date is still good
        else{
                days=0;hours=0;mins=0;secs=0;
                out_days="";out_hours="";out_mins="";out_secs="";

                amount = Math.floor(amount/1000);//kill the "milliseconds" so just secs

                days=Math.floor(amount/86400);//days
                amount=amount%86400;

                hours=Math.floor(amount/3600);//hours
                amount=amount%3600;

                mins=Math.floor(amount/60);//minutes
                amount=amount%60;

                secs=Math.floor(amount);//seconds
				
                if(days < 10){out_days += "0";} //записываем первый (передний) нуль дней
        		if(days != 0){out_days += days;}
        		   else {out_days += "0";} //записываем второй нуль дней если дни равны нулю
        		   
        		if(hours < 10) {out_hours += "0";} //записываем первый (передний) нуль часов
        		if(days != 0 || hours != 0){out_hours += hours;}
        		   else {out_hours += "0";} //записываем второй нуль часов если часы равны нулю
        		
        		if(mins < 10) {out_mins += "0";} //записываем первый (передний) нуль минут
        		if(days != 0 || hours != 0 || mins != 0){out_mins += mins;}
        		   else {out_mins += "0";} //записываем второй нуль минут если минуты равны нулю
        		   
        		if(secs < 10){out_secs += "0";}
        		out_secs += secs;
				
                /*document.getElementById('count-days').innerHTML=out_days;
                document.getElementById('count-hours').innerHTML=out_hours;
                document.getElementById('count-mins').innerHTML=out_mins;
                document.getElementById('count-secs').innerHTML=out_secs;*/
                $(".count-days").html(out_days);
                $(".count-hours").html(out_hours);
                $(".count-mins").html(out_mins);
                $(".count-secs").html(out_secs);

                setTimeout("GetCount()", 1000);
        }
}