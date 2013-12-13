$(document).on("new-data", function() {
  $( "#progressbar" ).progressbar({value: 3});
  if(dataHandler.dataReady > 2) {
    var percentage = Math.round(dataHandler.c / dataHandler.friendsIdsArray.length * 100);
    $( "#progressbar" ).progressbar({value: percentage});
    $( "#progressbar .progress-label" ).text(percentage + "%");
  }
});

$(document).on("data-ready", function() {
  console.log(dataHandler.dataObject);

  $("#welcome").text("Hey, " + dataHandler.dataObject[0].first_name + "!");
  $("#user-details img").attr("src", dataHandler.dataObject[0].profile_pic);
  $("#user-details").css("visibility", "visible");
  $("#welcome, #user-details img").fadeIn(700);
});