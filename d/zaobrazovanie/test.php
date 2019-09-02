<?php

$recepient = "test@lubus.ru";
$sitename = "course.zaobrazovanie.ru";

$email = "test@test.ru";

$pagetitle = "Новая заявка с сайта \"$sitename\"";
$message = "Email: $email";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient") or print "Не могу отправить письмо !!!";

print_r($message);