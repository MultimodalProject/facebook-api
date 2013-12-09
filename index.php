<!DOCTYPE html>

<html>
<head>
	<title>Facebook connect</title>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="js/fb-init.js"></script>
	<script src="js/app.js"></script>
</head>

<body>
	<div id="fb-root"></div>

	<div id="user-details" style="display: none;">
		<h1 id="welcome"></h1>
		<div id="profile-pic">
		</div>

		<p>User ID: <span id="user-id"></span></p>
		<p>Gender: <span id="gender"></span></p>
		<p>Birthday: <span id="birthday"></span></p>
		<p>Hometown: <span id="hometown"></span></p>
		<p>Current Location: <span id="location"></span></p>
		<p>Relationship Status: <span id="relationship-status"></span></p>
		<p>Number of friends: <span id="friends"></span></p>
		<p>Female: <span id="female"></span></p>
		<p>Male: <span id="male"></span></p>

		
	</div>
	

	<button id="fb-log-in" style="display: none;">Connect to App via Facebook</button>
	<button id="fb-log-out" style="display: none;">Log out</button>
</body>
</html>