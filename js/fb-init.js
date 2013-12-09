// prepare fb init
window.fbAsyncInit = function() {
	// init the FB JS SDK
	FB.init({
	  appId      : '368222886646941',                    // App ID from the app dashboard
	  status     : true,                                 // Check Facebook Login status
	  cookie     : true, 								 								 // enable cookies to allow the server to access the session
	  xfbml      : true                                  // Look for social plugins on the page
	});

	$(document).trigger('fbInit'); // trigger event
};

// Load the SDK asynchronously
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/all.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));