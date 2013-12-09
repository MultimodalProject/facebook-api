var loginMessage, 
		username,
		accessToken,
		uid,
		i = 0,
		c = 0;

$(document).on('ready', function() {

	// make sure that FB object is initialized and execute code
	// that is dependend on it only in here
	$(document).on('fbInit', function() {
		console.log('fbInit complete; FB Object is Available');

		// check login status of user
	  FB.getLoginStatus(function(response) {
		  if (response.status === 'connected') {
		    // the user is logged in and has authenticated your
		    // app, and response.authResponse supplies
		    // the user's ID, a valid access token, a signed
		    // request, and the time the access token 
		    // and signed request each expire
		    uid = response.authResponse.userID;
		    accessToken = response.authResponse.accessToken;

				showLogoutButton();
				welcomeUser();

		  } else if (response.status === 'not_authorized') {
		    // the user is logged in to Facebook, 
		    // but has not authenticated your app
		    showLoginButton();

		  } else {
		    // the user isn't logged in to Facebook.
		    showLoginButton();
		  }

		});

	  // event handler for log-in button
	  $("#fb-log-in").on('click', function() {
	  	FB.login(function(response) {
		    if (response.authResponse) {
			  	window.location.reload(false);
			   } else {
			   	console.log('User cancelled login or did not fully authorize.');
			   }
			}, {scope: 'user_birthday, friends_birthday, user_hometown, friends_hometown, user_interests, friends_interests, user_likes, friends_likes, user_location, friends_location, user_relationships, friends_relationships, user_religion_politics, friends_religion_politics'});
		});

	  // event handler for log-out button
		$("#fb-log-out").on('click', function() {
			FB.logout(function(response) {
			  // user is now logged out
			  window.location.reload(false);
			});	
		});
	});	
});

// what happens if user has connected to the app
function welcomeUser() {
	$("#user-details").show();
	$("#user-id").text(uid);

	// make api call
	FB.api('/me', function(response) {
		if (response && !response.error) {
      /* handle the result */
      $("#welcome").text('Good to see you, ' + response.name);
			$("#gender").text(response.gender);
			$("#birthday").text(response.birthday);
			$("#hometown").text(response.hometown.name);
			$("#location").text(response.location.name);
			$("#relationship-status").text(response.relationship_status);
	 
	  	console.log(response);
    }
		
  });

	// make another api call to get profile pic
	FB.api("/me/picture",
    {
        "redirect": false,
        "type": "large"
    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
        $("#profile-pic").append('<img src="' + response.data.url + '" alt="profile pic" />');
      }
    }
	);

	// call the users friends
	FB.api("/me/friends", function (response) {
    if (response && !response.error) {
      /* handle the result */
      console.log(response);
      $("#friends").text(response.data.length);
      
      var male = 0;
      var female = 0;

      while(response.data.length > i) {
		  	FB.api(response.data[i].id, function (userObject) {

	  			if(userObject.gender === 'male') {
	  				male++;
	  			} else {
	  				female++;
	  			}

	  			$("#male").text(male);
		  		$("#female").text(female);

		  	});
		  	i++;
		  }
    }
  });
};

function showLoginButton() {
	$("#fb-log-in").css({display: 'block'});
}

function showLogoutButton() {
	$("#fb-log-out").css({display: 'block'});
}
