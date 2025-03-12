<?php
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(405); // Method Not Allowed
    exit("Method Not Allowed"); // More informative message
}

// Validate inputs - more robust checks
if (empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['message']) || !isset($_POST['email'])) {
    http_response_code(400); // Bad Request
    exit("Please fill all required fields."); // More informative
}

$name = trim(strip_tags($_POST['name']));
$email = trim(strip_tags($_POST['email']));  // Trim whitespace
$m_subject = trim(strip_tags($_POST['subject']));
$message = trim(strip_tags($_POST['message']));

if (strlen($name) > 255 || strlen($m_subject) > 255) {
    http_response_code(400);
    exit("Name or Subject too long.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit("Invalid email format.");
}

// Email Configuration
$to = "info@example.com"; // Change this email to your actual email
$subject = "$m_subject: $name";

// Construct the email body using HEREDOC syntax for readability
$body = <<<EOT
You have received a new message from your website contact form.

Here are the details:

Name: $name

Email: $email

Subject: $m_subject

Message: $message
EOT;

// Secure Email Headers (Crucial for preventing email injection!)
$headers = [
    'From' => 'noreply@example.com',  // Use a noreply address on your domain
    'Reply-To' => $email, // Allow reply, sanitize mail() argument

    'X-Mailer' => 'PHP/' . phpversion() // Add for informational purposes. Not required
];

// Construct the header string (properly encoded) - single argument to mail()
$header_string = '';
foreach ($headers as $key => $value) {
    $header_string .= $key . ': ' . $value . "\r\n"; // Newline is CR LF
}

// Send the email (using the secure headers)
if (!mail($to, $subject, $body, $header_string)) {
    http_response_code(500);
    exit("Failed to send email.");
}

echo "Email sent successfully!";  // Success message

?>
