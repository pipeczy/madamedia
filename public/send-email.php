<?php
// Configuración de errores (desactivar en producción)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Headers de seguridad
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

// Permitir solo POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Función para limpiar datos
function limpiarDato($dato) {
    return htmlspecialchars(strip_tags(trim($dato)), ENT_QUOTES, 'UTF-8');
}

// Función para validar email
function validarEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

try {
    // Obtener y validar datos del formulario
    $nombre = isset($_POST['nombre']) ? limpiarDato($_POST['nombre']) : '';
    $email = isset($_POST['email']) ? limpiarDato($_POST['email']) : '';
    $empresa = isset($_POST['empresa']) ? limpiarDato($_POST['empresa']) : '';
    $plan = isset($_POST['plan']) ? limpiarDato($_POST['plan']) : '';
    $mensaje = isset($_POST['mensaje']) ? limpiarDato($_POST['mensaje']) : '';

    // Validaciones
    $errores = [];

    if (empty($nombre) || strlen($nombre) < 2) {
        $errores[] = 'El nombre es requerido y debe tener al menos 2 caracteres.';
    }

    if (empty($email) || !validarEmail($email)) {
        $errores[] = 'El email es inválido.';
    }

    if (empty($empresa)) {
        $errores[] = 'La empresa es requerida.';
    }

    if (empty($mensaje) || strlen($mensaje) < 10) {
        $errores[] = 'El mensaje debe tener al menos 10 caracteres.';
    }

    // Si hay errores, retornar
    if (!empty($errores)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Por favor, corrige los errores en el formulario.',
            'errors' => $errores
        ]);
        exit;
    }

    // Configuración SMTP
    $smtp_host = 'madamedia.cl';
    $smtp_port = 465; // Puerto SSL (cambiar a 587 si usas TLS)
    $smtp_user = 'no-reply@madamedia.cl';
    $smtp_pass = 'xoTo+31wEPoHGo8T';
    $smtp_secure = 'ssl'; // 'ssl' para puerto 465, 'tls' para puerto 587

    // Destinatario
    $to_email = 'Contacto@madamedia.cl';
    $to_name = 'MadaMedia - Contacto';

    // Preparar el plan seleccionado
    $planes = [
        'esencial' => 'RRSS Esencial',
        'completa' => 'RRSS Completa',
        'full' => 'RRSS Full',
        'carta' => 'A la Carta - Cotización'
    ];
    $plan_texto = isset($planes[$plan]) ? $planes[$plan] : 'No especificado';

    // Asunto del email
    $subject = 'Nuevo contacto desde MadaMedia.cl - ' . $nombre;

    // Cuerpo del email en HTML
    $html_body = '
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FF6B4A 0%, #E55A3A 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; padding: 15px; background: white; border-left: 4px solid #FF6B4A; border-radius: 5px; }
            .field-label { font-weight: bold; color: #FF6B4A; margin-bottom: 5px; }
            .field-value { color: #333; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0; font-size: 28px;">Nuevo Contacto</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">MadaMedia.cl</p>
            </div>
            <div class="content">
                <div class="field">
                    <div class="field-label">Nombre:</div>
                    <div class="field-value">' . $nombre . '</div>
                </div>

                <div class="field">
                    <div class="field-label">Email:</div>
                    <div class="field-value"><a href="mailto:' . $email . '">' . $email . '</a></div>
                </div>

                <div class="field">
                    <div class="field-label">Empresa / Marca:</div>
                    <div class="field-value">' . $empresa . '</div>
                </div>

                <div class="field">
                    <div class="field-label">Plan Interesado:</div>
                    <div class="field-value">' . $plan_texto . '</div>
                </div>

                <div class="field">
                    <div class="field-label">Mensaje:</div>
                    <div class="field-value">' . nl2br($mensaje) . '</div>
                </div>

                <div class="field" style="border-left-color: #ddd;">
                    <div class="field-label" style="color: #666;">Información Adicional:</div>
                    <div class="field-value" style="font-size: 12px; color: #666;">
                        <strong>IP:</strong> ' . $_SERVER['REMOTE_ADDR'] . '<br>
                        <strong>Fecha:</strong> ' . date('d/m/Y H:i:s') . '<br>
                        <strong>Navegador:</strong> ' . $_SERVER['HTTP_USER_AGENT'] . '
                    </div>
                </div>
            </div>
            <div class="footer">
                <p>Este email fue enviado desde el formulario de contacto de <strong>madamedia.cl</strong></p>
            </div>
        </div>
    </body>
    </html>
    ';

    // Cuerpo del email en texto plano (fallback)
    $text_body = "Nuevo Contacto desde MadaMedia.cl\n\n";
    $text_body .= "Nombre: $nombre\n";
    $text_body .= "Email: $email\n";
    $text_body .= "Empresa: $empresa\n";
    $text_body .= "Plan: $plan_texto\n\n";
    $text_body .= "Mensaje:\n$mensaje\n\n";
    $text_body .= "---\n";
    $text_body .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";
    $text_body .= "Fecha: " . date('d/m/Y H:i:s') . "\n";

    // Verificar si PHPMailer está disponible
    if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        // Usar PHPMailer
        require_once 'vendor/autoload.php';

        $mail = new PHPMailer\PHPMailer\PHPMailer(true);

        // Configuración del servidor SMTP
        $mail->isSMTP();
        $mail->Host = $smtp_host;
        $mail->SMTPAuth = true;
        $mail->Username = $smtp_user;
        $mail->Password = $smtp_pass;
        $mail->SMTPSecure = $smtp_secure;
        $mail->Port = $smtp_port;
        $mail->CharSet = 'UTF-8';

        // Remitente y destinatario
        $mail->setFrom($smtp_user, 'MadaMedia - Formulario Web');
        $mail->addAddress($to_email, $to_name);
        $mail->addReplyTo($email, $nombre);

        // Contenido
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $html_body;
        $mail->AltBody = $text_body;

        // Enviar
        $mail->send();

    } else {
        // Usar mail() nativo de PHP con headers personalizados
        $boundary = md5(time());

        $headers = "From: MadaMedia Web <$smtp_user>\r\n";
        $headers .= "Reply-To: $nombre <$email>\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/alternative; boundary=\"$boundary\"\r\n";

        $email_body = "--$boundary\r\n";
        $email_body .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $email_body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $email_body .= $text_body . "\r\n\r\n";

        $email_body .= "--$boundary\r\n";
        $email_body .= "Content-Type: text/html; charset=UTF-8\r\n";
        $email_body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $email_body .= $html_body . "\r\n\r\n";

        $email_body .= "--$boundary--";

        // Enviar email
        if (!mail($to_email, $subject, $email_body, $headers)) {
            throw new Exception('Error al enviar el email.');
        }
    }

    // Respuesta exitosa
    echo json_encode([
        'success' => true,
        'message' => '¡Gracias por contactarnos! Te responderemos pronto.'
    ]);

} catch (Exception $e) {
    // Log del error
    error_log('Error en send-email.php: ' . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente o contáctanos directamente a contacto@madamedia.cl'
    ]);
}
?>
