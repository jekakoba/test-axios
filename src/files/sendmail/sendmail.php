<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require 'phpmailer/src/SMTP.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);
	$mail->isSMTP(); 
	$mail->Host       = 'smtp.gmail.com';
	$mail->SMTPAuth   = true;
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
	$mail->Port       = 465; // 587
	$mail->Username   = 'endlesss2k2k@gmail.com';   //      leadgenerator1001@gmail.com
    $mail->Password   = 'akxmvdlvdkfhzmmm';    //        ptltiwlyrteghsth

	$mail_title = $_POST['mail-title'];
	// <input data-mail-title-footer name="mail-title" type="hidden" value="GOT INTERESTED? CONTACT US!"> — приклад підзаголовку листа у value
	$mail_subject = $_POST['subject'];
	// <input id="subject" name="subject" type="hidden" value="Fractional CMO"> — приклад заголовку листа у value

	
	$html .= '<h3>' . $mail_title . '</h3>';
	$html .= '<ul>'; 
	$isValidate = true;
	foreach ($_POST as $key => $value) {
		if($key != 'subject' && $key != 'mail-title'){
			$decoded_value = urldecode($value);
			$formatted_key = str_replace('_', ' ', $key);
			$html .= '<li><strong>' . $formatted_key . ':</strong> ' . $decoded_value . '</li>';
			if($value === ''){
				$isValidate = false;
			}
		}
	}
	
	$html .= '</ul>'; 
	//Від кого лист
	$mail->setFrom('endlesss2k2k@gmail.com');  // Від кого лист    leadgenerator1001@gmail.com
	//Кому відправити
	$mail->addAddress('test@jekakoba.com');  //     order@fractional-expert.com
	//Тема листа 
	
	$mail->Subject = $mail_subject;
	if($isValidate){
	$mail->Body = $html;
	}else{
		$message = 'Error validate form';
	}
	//Відправляємо
	if (!$mail->send()) {
		$message = 'Помилка';
	} else {
		$message = 'Дані надіслані!';
	}
	$response = ['message' => $message];
	header('Content-type: application/json');
	echo json_encode($response);
?>

