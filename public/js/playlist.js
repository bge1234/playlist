$(document).ready(function() {
  var getter = $.ajax({
    url: "https://lit-fortress-6467.herokuapp.com/object",
    method: "GET",
    dataType: "json"
  });

  getter.done(function(response) {
    var coll = [];
    getAllAlbumCovers(response);

    //Watch for clicks on album covers and display information when clicked
    $(".albumdiv").click(function() {
      var id = this.id;
      var elem = 0;

      for(var i = 0; i < response["results"].length; i++) {
        if(response["results"][i]["title"] === id)
          elem = i;
       }
       var title = response["results"][elem]["title"];

        //Output to page
        $(".output").remove();
        $("#albuminfo").append("<p class='currtitle output' id='item" + elem + "'>" + response["results"][elem]["artist"] + ": " + response["results"][elem]["title"] + "</p>");
        $("#currentcover").append("<img class='currcover output' src='images/" + response["results"][elem]["cover_art"] + "'>");
        for(i = 0; i < tracks[title].length; i++) {
          $("#tracklist").append("<option id='track" + tracks[title][i]["track_number"] + "' class='output'>" + tracks[title][i]["name"] + " (" + tracks[title][i]["time"] +")</option>");
          console.log("<option id='track" + tracks[title][i]["track_number"] + "' class='output'>" + tracks[title][i]["name"] + " (" + tracks[title][i]["time"] +")</option>");
        }

        //Save to collection
        coll.push({
          artist: response["results"][elem]["artist"],
          title: response["results"][elem]["title"]
        });
     });

      $("#addtrack").click(function() {
        var trackID = $("#tracklist").val();
        $("#track1").remove();
        //Remove track from lefthand list
        //Add track to righthand list
      });

      //Todo:
        //Figure out how to dynamically get option ID from track list to finish "add" click function
        //Copy "add" click function to "remove"
        //Handle multiple selections in add/remove
        //Save tracks to coll instead of albums

      $("#clear").click(function() {
        $(".output").remove();
     });

      $("#send").click(function() {
        var poster = $.ajax({
          url: "https://lit-fortress-6467.herokuapp.com/post",
          method: "POST",
          data: coll
       });

        poster.done(function(response2) {
          $(".output").remove();
          console.log(response2);
          alert("Submitted successfully!");
       });

        poster.fail(function(response2) {
          console.log("Error posting!");
       })
     });
  });

  getter.fail(function(response) {
    console.log("Error getting JSON!");
  });
});

function getAllAlbumCovers(response) {
  for(var i = 0; i < response["results"].length; i++) {
    $("#albumarea").append("<div class ='albumdiv' id='" + response["results"][i]["title"] + "'><img class='albumimg' src='images/" + response["results"][i]["cover_art"] + "'></div>");
  };
};
