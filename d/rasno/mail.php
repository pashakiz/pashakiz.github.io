<?php

$recepient = "pashakiz@gmail.com";
$sitename = "RASNO";

$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$text = trim($_POST["text"]);

$EOL = "\r\n";
$pagetitle = "Новая заявка с сайта \"$sitename\"";
$message = "Имя: $name $EOLТелефон: $phone $EOLТекст: $text";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"$EOL From: $name <$recepient>");