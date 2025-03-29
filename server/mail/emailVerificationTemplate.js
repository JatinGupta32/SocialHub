const emailTemplate = (otp) => {
	return `
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>MediaZ OTP Verification</title>
		<style>
			body {
				font-family: Arial, sans-serif;
				background-color: #f4f4f4;
				margin: 0;
				padding: 0;
			}
			.container {
				width: 100%;
				max-width: 600px;
				margin: 20px auto;
				background: #ffffff;
				border-radius: 8px;
				box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
				overflow: hidden;
			}
			.header {
				background: #007bff;
				color: #ffffff;
				padding: 20px;
				text-align: center;
				font-size: 24px;
				font-weight: bold;
				letter-spacing: 1px;
			}
			.content {
				padding: 20px;
				text-align: center;
				font-size: 18px;
				color: #333;
			}
			.otp {
				font-size: 30px;
				font-weight: bold;
				background: #007bff;
				color: #ffffff;
				display: inline-block;
				padding: 10px 20px;
				border-radius: 5px;
				margin: 20px 0;
			}
			.footer {
				text-align: center;
				font-size: 14px;
				color: #888;
				padding: 15px;
				background: #f4f4f4;
				border-top: 1px solid #ddd;
			}
			.brand {
				font-size: 22px;
				font-weight: bold;
				color: #007bff;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="header">
				Welcome to <span class="brand">MediaZ</span> 🔹
			</div>
			<div class="content">
				<p>Dear User,</p>
				<p>Your One-Time Password (OTP) for MediaZ verification is:</p>
				<div class="otp">${otp}</div>
				<p>This OTP is valid for <b>5 minutes</b>. Please do not share it with anyone.</p>
				<p>If you did not request this, please ignore this email.</p>
			</div>
			<div class="footer">
				© 2025 <b>MediaZ</b> | All rights reserved.<br>
				Need help? Contact us at <a href="mailto:support@mediaz.com">support@mediaz.com</a>
			</div>
		</div>
	</body>
	</html>
	`;
};

module.exports = emailTemplate;
// const otpTemplate = (otp) => {
// 	return `<!DOCTYPE html>
// 	<html>
	
// 	<head>
// 		<meta charset="UTF-8">
// 		<title>OTP Verification Email</title>
// 		<style>
// 			body {
// 				background-color: #ffffff;
// 				font-family: Arial, sans-serif;
// 				font-size: 16px;
// 				line-height: 1.4;
// 				color: #333333;
// 				margin: 0;
// 				padding: 0;
// 			}
	
// 			.container {
// 				max-width: 600px;
// 				margin: 0 auto;
// 				padding: 20px;
// 				text-align: center;
// 			}
	
// 			.logo {
// 				max-width: 200px;
// 				margin-bottom: 20px;
// 			}
	
// 			.message {
// 				font-size: 18px;
// 				font-weight: bold;
// 				margin-bottom: 20px;
// 			}
	
// 			.body {
// 				font-size: 16px;
// 				margin-bottom: 20px;
// 			}
	
// 			.cta {
// 				display: inline-block;
// 				padding: 10px 20px;
// 				background-color: #FFD60A;
// 				color: #000000;
// 				text-decoration: none;
// 				border-radius: 5px;
// 				font-size: 16px;
// 				font-weight: bold;
// 				margin-top: 20px;
// 			}
	
// 			.support {
// 				font-size: 14px;
// 				color: #999999;
// 				margin-top: 20px;
// 			}
	
// 			.highlight {
// 				font-weight: bold;
// 			}
// 		</style>
	
// 	</head>
	
// 	<body>
// 		<div class="container">
// 			<a href="https://studynotion-edtech-project.vercel.app"><img class="logo"
// 					src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo"></a>
// 			<div class="message">OTP Verification Email</div>
// 			<div class="body">
// 				<p>Dear User,</p>
// 				<p>Thank you for registering with StudyNotion. To complete your registration, please use the following OTP
// 					(One-Time Password) to verify your account:</p>
// 				<h2 class="highlight">${otp}</h2>
// 				<p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.
// 				Once your account is verified, you will have access to our platform and its features.</p>
// 			</div>
// 			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
// 					href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!</div>
// 		</div>
// 	</body>
	
// 	</html>`;
// };
// module.exports = otpTemplate;
