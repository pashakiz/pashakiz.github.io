<?php

$recepient = "test@lubus.ru";
$sitename = "SKOKOV (lubus host)";

$name = trim($_GET["name"]);
$email = trim($_GET["email"]);
$subject = trim($_GET["subject"]);
$text = trim($_GET["message"]);

$pagetitle = "Новая заявка с сайта \"$sitename\"";
$message = "Name: $name \nEmail: $email \nSubject: $subject \nMessage: $text";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");