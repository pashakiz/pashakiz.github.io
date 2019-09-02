<?php

$EOL = "\r\n";
$recepient = "pashakiz@gmail.com"; /*info@career-lift.ru*/
$sitename = "career-lift.ru";
$noreply = "noreply@career-lift.ru";

$formtype = trim($_POST["formtype"]);
$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$email = trim($_POST["email"]);
$date = trim($_POST["date"]);
$time = trim($_POST["time"]);
$comment = trim($_POST["comment"]);

if ($formtype == "callback") { /*заказали обратный звонок*/
	$pagetitle = "Заявка с сайта \"$sitename\" (Обратный звонок)";
	//$pagetitle = chunk_split(base64_encode($pagetitle));
	$message = "Имя: $name\r\nТелефон: $phone\r\nУдобный день: $date\r\nВремя: $time\r\n";

	$headers = "MIME-Version: 1.0;$EOL";
	$headers .= "Content-Type: text/plain; charset=utf8$EOL";
	$headers .= "From: $name <$noreply>";

	if (mail($recepient, $pagetitle, $message, $headers)) {
		echo "Спасибо, Ваша заявка отправлена! <br><a href=\>Вернуться назад</a>";
	} else {
		echo "Ошибка! Ваша заявка не отправлена! <br><a href=\>Вернуться назад</a>";
	}
}

if ($formtype == "getaudit") { /*получить аудит*/
	$pagetitle = "Заявка с сайта \"$sitename\" (Получить аудит)";
	$message = "Имя: $name\r\nТелефон: $phone\r\nEmail: $email\r\nКомментарий: $comment\r\n";

	if (!empty($_FILES["file"]["name"])) {

		// Закачиваем файл 
		$file_name = $_FILES["file"]["name"];
		if (copy($_FILES["file"]["tmp_name"], $file_name)) {
			$rezume = $file_name;
		}

		$fp = fopen($rezume,"rb");
		if (!$fp)
		{ print "Cannot open file";
		  exit();
		}
		$file = fread($fp, filesize($rezume));
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
			echo "Спасибо, Ваша заявка отправлена! <br><a href=\>Вернуться назад</a>";
		} else {
			echo "Ошибка! Ваша заявка не отправлена! <br><a href=\>Вернуться назад</a>";
		}
	}
}

if ($formtype == "programdescr") { /*Получить описание программ*/
	$pagetitle = "Заявка с сайта \"$sitename\" (Получить описание программ)";
	$message = "Имя: $name\r\nТелефон: $phone\r\nEmail: $email\r\n";

	$headers = "MIME-Version: 1.0;$EOL";
	$headers .= "Content-Type: text/plain; charset=utf8$EOL";
	$headers .= "From: $name <$email>";

	if (mail($recepient, $pagetitle, $message, $headers)) {
		echo "Спасибо, Ваша заявка отправлена! <br><a href=\>Вернуться назад</a>";
	} else {
		echo "Ошибка! Ваша заявка не отправлена! <br><a href=\>Вернуться назад</a>";
	}
}

if ($formtype == "programstart") { /*Начать программу*/
	$pagetitle = "Заявка с сайта \"$sitename\" (Начать программу)";
	$message = "Имя: $name\r\nТелефон: $phone\r\nEmail: $email\r\nУдобный день: $date\r\nВремя: $time\r\n";
	
	if (!empty($_FILES["file"]["name"])) {

		// Закачиваем файл 
		$file_name = $_FILES["file"]["name"];
		if (copy($_FILES["file"]["tmp_name"], $file_name)) {
			$rezume = $file_name;
		}

		$fp = fopen($rezume,"rb");
		if (!$fp)
		{ print "Cannot open file";
		  exit();
		}
		$file = fread($fp, filesize($rezume));
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
			echo "Спасибо, Ваша заявка отправлена! <br><a href=\>Вернуться назад</a>";
		} else {
			echo "Ошибка! Ваша заявка не отправлена! <br><a href=\>Вернуться назад</a>";
		}
	}
}
