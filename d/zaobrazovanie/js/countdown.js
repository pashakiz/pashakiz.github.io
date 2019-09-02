/*
* Autor: Pavel Kizernis (pashakiz@gmail.com)
*
*/


var date_str = $('.countdown').attr("data-countdown-date"); //yyyy-m-d-h-m-s
var date_future = date_str.split('-'); //"yyyy", "m", "d", "h", "m", "s"

// Месяц должен начинаться с 0 в js, поэтому декрементируем значение
--date_future[1];

dateFuture = new Date(date_future[0],date_future[1],date_future[2],date_future[3],date_future[4],date_future[5]);
//dateFuture = new Date(2015,09,1,0,0,0); //01.10.2015 00:00:00

function GetCount() {

        dateNow = new Date(); //grab current date
        amount = dateFuture.getTime() - dateNow.getTime(); //calc milliseconds between dates
        delete dateNow;

        // time is already past
        if(amount < 0) {
                $(".count-days .value").html(0);
                $(".count-days .title").html("дней");

                $(".count-hours .value").html(0);
                $(".count-hours .title").html("часов");

                $(".count-mins .value").html(0);
                $(".count-mins .title").html("минут");

                $(".count-seconds .value").html(0);
                $(".count-seconds .title").html("секунд");
        }
        // date is still good
        else{
                var days=0,hours=0,mins=0,secs=0;

                amount = Math.floor(amount/1000);//kill the "milliseconds" so just secs

                days=Math.floor(amount/86400);//days
                amount=amount%86400;

                hours=Math.floor(amount/3600);//hours
                amount=amount%3600;

                mins=Math.floor(amount/60);//minutes
                amount=amount%60;

                secs=Math.floor(amount);//seconds

                $(".count-days .value").html(days);
                if (days%10 == 1) {
                        $(".count-days .title").html("день");
                } else if (days%10 == 0 || days%10 >= 5) {
                        $(".count-days .title").html("дней");
                } else if (days%10 == 2 || days%10 == 3 || days%10 == 4) {
                        $(".count-days .title").html("дня");
                }

                $(".count-hours .value").html(hours);
                if (hours%10 == 1) {
                        $(".count-hours .title").html("час");
                } else if (hours%10 == 0 || hours%10 >= 5) {
                        $(".count-hours .title").html("часов");
                } else if (hours%10 == 2 || hours%10 == 3 || hours%10 == 4) {
                        $(".count-hours .title").html("часа");
                }

                $(".count-mins .value").html(mins);
                if (mins%10 == 1) {
                        $(".count-mins .title").html("минута");
                } else if (mins%10 == 0 || mins%10 >= 5) {
                        $(".count-mins .title").html("минут");
                } else if (mins%10 == 2 || mins%10 == 3 || mins%10 == 4) {
                        $(".count-mins .title").html("минуты");
                }

                $(".count-seconds .value").html(secs);
                if (secs%10 == 1) {
                        $(".count-seconds .title").html("секунда");
                } else if (secs%10 == 0 || secs%10 >= 5) {
                        $(".count-seconds .title").html("секунд");
                } else if (secs%10 == 2 || secs%10 == 3 || secs%10 == 4) {
                        $(".count-seconds .title").html("секунды");
                }

                setTimeout("GetCount()", 1000);
        }
}