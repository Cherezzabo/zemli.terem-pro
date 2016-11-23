<?php
    $user=$_POST['userName'];

    $tomeFrom=$_POST['from'];
    $tomeTo=$_POST['to'];
    $date=$_POST['date'];

    $phone=$_POST['userPhoneNumber'];
    $mail=$_POST['userEmail'];
 	$to = "amehin@plus78.ru, sazanova@plus78.ru";
 	//$to = "head123455@yandex.ru";
    $subject = "Заявка!";
    if($user){
    	$message = "<br>Клиент: " . $user . "<br>Номер телефона:" . $phone . "<br>Почта клиента:" . $mail . "<br>Звонить: c " . $tomeFrom . " по " . $tomeTo . "<br>Дата для звонка " . $date;
    }
    else $message = "<br>Клиент: " . $user . "<br>Номер телефона:" . $phone . "<br>Почта клиента:" . $mail . "<br>Звонить: c " . $tomeFrom . " по " . $tomeTo . "<br>Дата для звонка " . $date;
    
    $headers = "Content-type: text/html; charset=UTF-8 \r\n";
    $headers .= "From: wth\r\n";
    
    if (!mail($to, $subject, $message, $headers)) {
        $errors[] = "Ошибка, сообщение не отправлено. Попробуйте позже.";
    }
    
?>
