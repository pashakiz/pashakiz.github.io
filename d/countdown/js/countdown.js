/*
* Autor: Pavel Kizernis (pashakiz@gmail.com)
* https://github.com/pashakiz/countdown.js
*/

function InitCountDown() {

        // Записываем в div.countdown всю HTML-разметку
        $('.countdown').html('<div class="count-block count-days"><div class="value"></div><div class="title"></div></div><div class="count-separator"></div><div class="count-block count-hours"><div class="value"></div><div class="title"></div></div><div class="count-separator"></div><div class="count-block count-mins"><div class="value"></div><div class="title"></div></div><div class="count-separator"></div><div class="count-block count-seconds"><div class="value"></div><div class="title"></div></div>');

        // Берем дату в строке: "yyyy-m-d-h-m-s"
        var date_str = $('.countdown').attr("data-countdown-date");
        // Разбиваем строку на массив: "yyyy", "m", "d", "h", "m", "s"
        var date_future = date_str.split('-');

        // Месяц должен начинаться с 0 в js, поэтому декрементируем значение второго элемента массива
        --date_future[1];

        // Создаем объект dateFuture типа Date с датой до которой счетчик будет тикать
        dateFuture = new Date(date_future[0],date_future[1],date_future[2],date_future[3],date_future[4],date_future[5]);

        // Вызываем рекурсивную функцию счетчика с аргументом dateFuture
        CountDown(dateFuture);
}

function CountDown(dateFuture) {

        dateNow = new Date(); // берем текущую дату в dateNow
        amount = dateFuture.getTime() - dateNow.getTime(); // высчитываем разницу между датами в милисекундах
        delete dateNow;

        // что если dateFuture меньше, чем dateNow? Выведем тогда просто одни нули
        if(amount <= 0) {
                $(".count-days .value").html(0);
                $(".count-days .title").html("дней");

                $(".count-hours .value").html(0);
                $(".count-hours .title").html("часов");

                $(".count-mins .value").html(0);
                $(".count-mins .title").html("минут");

                $(".count-seconds .value").html(0);
                $(".count-seconds .title").html("секунд");
        }
        else { // Все в порядке - dateFuture больше, чем dateNow, а значит есть, что считать
                var days=0,hours=0,mins=0,secs=0;

                amount = Math.floor(amount/1000); //милисекунды нам не нужны - округлим до секунд

                days=Math.floor(amount/86400); //получаем дни (1 день = 86400 секунд)
                amount=amount%86400; // сохраняем остаток

                hours=Math.floor(amount/3600); //часы
                amount=amount%3600;

                mins=Math.floor(amount/60); //минуты
                amount=amount%60;

                secs=Math.floor(amount); //секунды

                //Выводим результат с правилами русского языка (11-14 дней, 1 день, 2-3-4 дня, 5-9-0 дней)
                $(".count-days .value").html(days);
                if (days%100 == 11 || days%100 == 12 || days%100 == 13 || days%100 == 14) {
                        $(".count-days .title").html("дней");
                } else if (days%10 == 1) {
                        $(".count-days .title").html("день");
                } else if (days%10 == 0 || days%10 >= 5) {
                        $(".count-days .title").html("дней");
                } else if (days%10 == 2 || days%10 == 3 || days%10 == 4) {
                        $(".count-days .title").html("дня");
                }

                $(".count-hours .value").html(hours);
                if (hours >= 11 && hours <= 14) {
                        $(".count-hours .title").html("часов");
                } else if (hours%10 == 1) {
                        $(".count-hours .title").html("час");
                } else if (hours%10 == 0 || hours%10 >= 5) {
                        $(".count-hours .title").html("часов");
                } else if (hours%10 == 2 || hours%10 == 3 || hours%10 == 4) {
                        $(".count-hours .title").html("часа");
                }

                $(".count-mins .value").html(mins);
                if (mins >= 11 && mins <= 14) {
                        $(".count-mins .title").html("минут");
                } else if (mins%10 == 1) {
                        $(".count-mins .title").html("минута");
                } else if (mins%10 == 0 || mins%10 >= 5) {
                        $(".count-mins .title").html("минут");
                } else if (mins%10 == 2 || mins%10 == 3 || mins%10 == 4) {
                        $(".count-mins .title").html("минуты");
                }

                $(".count-seconds .value").html(secs);
                if (secs >= 11 && secs <= 14) {
                        $(".count-seconds .title").html("секунд");
                } else if (secs%10 == 1) {
                        $(".count-seconds .title").html("секунда");
                } else if (secs%10 == 0 || secs%10 >= 5) {
                        $(".count-seconds .title").html("секунд");
                } else if (secs%10 == 2 || secs%10 == 3 || secs%10 == 4) {
                        $(".count-seconds .title").html("секунды");
                }

                setTimeout("CountDown(dateFuture)", 1000); //запускаем снова через 1 секунду
        }
}