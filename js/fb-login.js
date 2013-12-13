// define vars
var uid,
    accessToken;

$(document).on("fb-ready", function() {

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      // the user is logged in and has authenticated your
      // app, and response.authResponse supplies
      // the user's ID, a valid access token, a signed
      // request, and the time the access token 
      // and signed request each expire
      uid = response.authResponse.userID;
      accessToken = response.authResponse.accessToken;

      console.log("logged in and authorized");
      console.log(uid);
      
      logoutBtn("block");

      startApp(uid);

    } else if (response.status === 'not_authorized') {
      // the user is logged in to Facebook, 
      // but has not authenticated your app
      loginBtn("block");
    } else {
      // the user isn't logged in to Facebook.
      loginBtn("block");
    }
  });

  // event handler for log-in button
  $("#fb-log-in").on('click', function() {
    fbLogin();
  });

  // event handler for log-out button
  $("#fb-log-out").on('click', function() {
    fbLogout();
  });
});

function fbLogin() {
  FB.login(function(response) {
    if(response.authResponse) {
      // user has successfully logged in
      logoutBtn("block");
      loginBtn("none");

      uid = response.authResponse.userID;
      accessToken = response.authResponse.accessToken;

      startApp(uid);

    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }, {
    scope: 'user_birthday, friends_birthday, user_hometown, friends_hometown, user_interests, friends_interests, user_likes, friends_likes, user_location, friends_location, user_relationships, friends_relationships, user_religion_politics, friends_religion_politics' 
  });
}

function fbLogout() {
  FB.logout(function(response) {
    // user is now logged out
    console.log("logged out!");
    loginBtn("block");
    logoutBtn("none");
  }); 
}

function startApp(userId) {
  dataHandler.getUserData(userId);
  dataHandler.getListOfFriends(userId);  
}

function loginBtn(display) {
  $("#fb-log-in").css("display", display);
}

function logoutBtn(display) {
  $("#fb-log-out").css("display", display);
}