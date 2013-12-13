<!DOCTYPE html>

<html>
<head>
	<meta charset="utf-8">
	<title>Facebook connect</title>
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
  <link rel="stylesheet" href="css/style.css">
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>	
	<script src="js/fb-init.js"></script>
	<script src="js/fb-data-handler.js"></script>	
	<script src="js/fb-login.js"></script>
	<script src="js/interface.js"></script>
</head>

<body>
	<div id="fb-root"></div>
	<div class="main-container">

		<div id="user-details">
			<img src="" alt="" width="150" height="150">
			<h1 id="welcome"></h1>
		</div>

		<div id="progressbar"><div class="progress-label">Fetching data...</div></div>
		<button id="fb-log-in">Connect to App via Facebook</button>
		<button id="fb-log-out">Log out</button>
	</div>
</body>
</html>