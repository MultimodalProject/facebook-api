$(document).ready(function() {
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_US/all.js', function(){

    // init the FB JS SDK
    FB.init({
      appId      : '368222886646941',                   // App ID from the app dashboard
      status     : true,                                // Check Facebook Login status
      cookie     : true                                 // enable cookies to allow the server to access the session
    });  

    $(document).trigger("fb-ready");
  });
});