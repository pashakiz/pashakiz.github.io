<?php

	if($_POST['submit']) {

		$name = substr(htmlspecialchars(trim($_POST['name'])), 0, 30);
		$phone =  substr(htmlspecialchars(trim($_POST['phone'])), 0, 50); 

		$subject = "Alex-novo.info Message";
		$to = "mail@lubus.ru";
		 
		$message = "Имя: $name\r\nТелефон: $phone\r\n";

		$headers  = "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/plain; charset=utf-8\r\n";
		$headers .= "From: alex-novo.info no-reply@alex-novo.info\r\n";

		mail ($to,$subject,$message,$headers);/* or print "<div id=\"mailreturn\"><p id=\"mailreturntext\">Не могу отправить письмо!</p></div>";

		echo "<div id=\"mailreturn\"><p id=\"mailreturntext\">Ваше сообщение отправлено.</p></div>";*/
	}
?>