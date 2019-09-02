<?php

$EOL = "\r\n";
$recepient = "pashakiz@gmail.com";
$sitename = "Сертификат МФТИ";
$pagetitle = "Новая заявка с сайта \"$sitename\"";

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$cert = trim($_POST["cert"]);

$message = "Имя: $name \r\nEmail: $email \r\nСертификат: $cert \r\n";

$headers =	'MIME-Version: 1.0. '."\r\n" .
			'Content-type: text/plain; charset=utf-8'. "\r\n" .
			'From: '.$name.' <'.$email.'>' . "\r\n" .
			'Reply-To: '.$email. "\r\n" .
			'X-Mailer: PHP/' . phpversion();

if (!empty($_FILES["photo"]["name"])) {

	// Закачиваем файл
	$file_name = $_FILES["photo"]["name"];
	if (copy($_FILES["photo"]["tmp_name"], $file_name)) {
		$photo = $file_name;
	}

	$fp = fopen($photo,"rb");
	if (!$fp)
	{ print "Cannot open file";
		exit();
	}
	$file = fread($fp, filesize($photo));
	fclose($fp);

	$boundary = "--".md5(uniqid(time()));
	$headers = "MIME-Version: 1.0;$EOL";
	$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"$EOL";
	$headers .= "From: $name <$email>";

	$multipart  = "--$boundary$EOL";
	$multipart .= "Content-Type: text/plain; charset=utf8$EOL";
	$multipart .= "Content-Transfer-Encoding: base64$EOL";
	$multipart .= $EOL; // раздел между заголовками и телом html-части
	$multipart .= chunk_split(base64_encode($message));

	$multipart .=  "$EOL--$boundary$EOL";
	$multipart .= "Content-Type: application/octet-stream; name=\"$file_name\"$EOL";
	$multipart .= "Content-Transfer-Encoding: base64$EOL";
	$multipart .= "Content-Disposition: attachment; filename=\"$file_name\"$EOL";
	$multipart .= $EOL; // раздел между заголовками и телом прикрепленного файла
	$multipart .= chunk_split(base64_encode($file));

	$multipart .= "$EOL--$boundary--$EOL";

	if (mail($recepient, $pagetitle, $multipart, $headers)) {
		echo "Success! Mail sent.";
	} else {
		echo "Error! Main didn't send.";
	}
}

mail($recepient, $pagetitle, $message, $headers);