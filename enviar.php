<?php>
	
	error_reporting(0);
	require_once 'PHPMailer/PHPMailerAutoload.php';
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $mobilephone = $_POST['mobilephone'];
   
    $mail = new PHPMailer(true);
 
	$mail->SetFrom('humana.rompecabezas.eii@ecrm.cl');
	$mail->AddAddress('johan.m@rompecabeza.cl');
	if (isset($_FILES['archivo']) && $_FILES['archivo']['error'] == UPLOAD_ERR_OK) {
		$mail->AddAttachment($_FILES['archivo']['tmp_name'],$_FILES['archivo']['name']);
	}
	$mail->isHTML(true);
	$mail->Subject = 'Edificio Humana - Captación de clientes';
	$mail->MsgHTML("Nombre: ".$firstname."<br> 
					Apellido: ".$lastname."<br>
					Email: ".$email."<br>
					Telefono: +56".$mobilephone."<br> ");
	if(!$mail->send()) {
	    //echo 'Message could not be sent.';
	    echo 'Mailer Error: ' . $email->ErrorInfo;
	} else {
	    //echo 'Message has been sent';
	}
        
?>

<meta http-equiv="refresh" content="2;url=index.html">

<legend>
	<p style="font-size: 30px;font-weight: 700;">GRACIAS</p>
	<p class="txt-bajada">tus datos fueron recibidos con éxito</p>
</legend>
