// create dataHandler class
var dataHandler = {};

// define properties
dataHandler.c = 0; // this is the main counter that determines the order of the dataObject object
dataHandler.dataReady = 0;
dataHandler.dataObject = {};
dataHandler.dataObject[dataHandler.c] = {};
dataHandler.friendsIdsArray = [];
dataHandler.friendsData = {};

// define methods

// event listener which checks if data set is complete
$(document).on("new-data", function() {
  dataHandler.dataReady++;

  if(dataHandler.dataReady > 1 && dataHandler.isEven(dataHandler.dataReady) === false && (dataHandler.dataReady - 3) / 2 < dataHandler.friendsIdsArray.length) {
    dataHandler.c++;
    dataHandler.dataObject[dataHandler.c] = {};
    dataHandler.getFriendsData();    
  }
  if((dataHandler.dataReady - 3) / 2 === dataHandler.friendsIdsArray.length) {
    $(document).trigger("data-ready");
    dataHandler.saveToDatabase(dataHandler.dataObject);
  }
});

// data needs to be in the form of an object or string
dataHandler.saveToDatabase = function (dataObject) {
  $.post("db-entry.php", dataObject, function(data) {
      console.log("success " + data);
  });
};

// this function is used to take the object delivered
// by the Facebook API and format in a way that later
// can be easily saved into a database
dataHandler.getUserData = function (id) {

  // make FB.api call using the user id
  // the response object contains all data
  // that was granted by the user 
  // To check which data can be retrieved from the API 
  // check this manual: https://developers.facebook.com/docs/graph-api/reference/
  FB.api("/" + id, function (response) {

    // handle response
    if (response && !response.error) {

      $.each(response, function(key, value) {

        // only save values that are strings
        if (key !== "locale" && key !== "languages" && key !== "hometown" && key !== "location" && key !== "favorite_athletes" && key !== "favorite_teams" && key !== "quotes" && key !== "sports" && key !== "timezone" && key !== "updated_time" && key !== "verified" && key !== "username" && key !== "link" && key !== "significant_other") {
          dataHandler.dataObject[dataHandler.c][key] = value;
        }

        // since hometown and location are objects 
        // only use the name property
        if (key === "hometown" || key === "location") {
          dataHandler.dataObject[dataHandler.c][key] = value.name;
        }

        // same applies for this properties but additionally 
        // they need to be iterated in case they contain 
        // several properties
        if (key === "languages" || key === "favorite_teams" || key === "favorite_athletes") {
          
          // add corresponding property to object 
          dataHandler.dataObject[dataHandler.c][key] = [];

          // iterate through object value and add data to array
          var i = 0;
          $.each(value, function(index, valueOfElement) {
            dataHandler.dataObject[dataHandler.c][key][i] = valueOfElement.name;
            i++;
          });
          dataHandler.dataObject[dataHandler.c][key] = JSON.stringify(dataHandler.dataObject[dataHandler.c][key]);
        }
      });
    }
    $(document).trigger("new-data");
  });

  // make api call to get profile pic
  FB.api("/" + id + "/picture",
    {
        "redirect": false,
        "width": "200",
        "height": "200"
    },
    function (response) {
      if (response && !response.error) {
        dataHandler.dataObject[dataHandler.c].profile_pic = response.data.url;
      }
    $(document).trigger("new-data");
  });
};

dataHandler.getListOfFriends = function (id) {
  // define array for saving of friends ids
  dataHandler.dataObject[dataHandler.c].friends_ids = [];

  // make another api call to get the list of friends
  FB.api("/" + id + "/friends", function (response) {
    if (response && !response.error) {
      // iterate through list of friends and create an array of the ids
      var i = 0;
      $.each(response.data, function(index, valueOfElement) {
        dataHandler.friendsIdsArray[i] = valueOfElement.id;
        i++;
      });
    }
    dataHandler.dataObject[dataHandler.c].friends_ids = JSON.stringify(dataHandler.friendsIdsArray);
    $(document).trigger("new-data");
  });
};

dataHandler.getFriendsData = function () {
  dataHandler.getUserData(dataHandler.friendsIdsArray[dataHandler.c - 1]);
};

dataHandler.isEven = function(value) {
  if (value % 2 == 0) {
    return true;
  } else {
    return false;
  }  
};