<?php

$recepient = "pashakiz@gmail.com";
$sitename = "course.zaobrazovanie.ru";

$email = trim($_GET["email"]);

$pagetitle = "Новая заявка с сайта \"$sitename\"";
$message = "Email: $email";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: <$email>\r\n";
/*"Content-type: text/plain; charset=\"utf-8\"\n From: <$email>"*/

mail($recepient, $pagetitle, $message, $headers);