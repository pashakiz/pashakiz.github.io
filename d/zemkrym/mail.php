<?php

$recepient = "pashakiz@gmail.com";
$sitename = "Zem-Krym.ru";
$pagetitle = "Новая заявка с сайта \"$sitename\"";

$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$question = "";
$question = trim($_POST["question"]);
$ip = $_SERVER["REMOTE_ADDR"];

if ( $question == "" ) {
	$message = "Имя: $name \r\nТелефон: $phone \r\nIP: $ip";
} else {
	$message = "Вопрос: $question \r\nТелефон: $phone \r\nIP: $ip";
}
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\r\n From: $name <no-reply@zem-krym.ru>");