$(document).ready(function() {
  var getter = $.ajax({
    url: "https://lit-fortress-6467.herokuapp.com/object",
    method: "GET",
    dataType: "json"
  });

  getter.done(function(response) {
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
        $("#tracklist").append("<option id='track" + tracks[title][i]["track_number"] + "' class='output'>" + tracks[title][i]["name"] + "</option>");
      }

        $("#addtrack").click(function() {
          var trackname = ($("#tracklist").val()).toString();
          var tracknameArr = trackname.split(',');
          for(i = 0; i < tracks[title].length; i++) {
            for(var j = 0; j < tracknameArr.length; j++) {
              if(tracknameArr[j] === tracks[title][i]["name"]) {
                $("#track" + (i + 1)).remove();
                $("#trackoutput").append("<option id='track" + tracks[title][i]["track_number"] + "' class='bincontents'>" + tracks[title][i]["name"] + "</option>");
              }
            }
         }
       });

        $("#removetrack").click(function() {
          var trackname = ($("#trackoutput").val()).toString();
          var tracknameArr = trackname.split(',');
          for(i = 0; i < tracks[title].length; i++) {
            for(var j = 0; j < tracknameArr.length; j++) {
              if(tracknameArr[j] === tracks[title][i]["name"]) {
                $("#track" + (i + 1)).remove();
                $("#tracklist").append("<option id='track" + tracks[title][i]["track_number"] + "' class='bincontents'>" + tracks[title][i]["name"] + "</option>");
              }
            }
          }
        });
     });

      $("#clear").click(function() {
        $(".output").remove();
     });

      $("#send").click(function() {
      //Save to collection
      var outputContents = $("#trackoutput>option").map(function() {
        return $(this).val();
      }).get();
      var coll = (outputContents.toString()).split(',');

      var poster = $.ajax({
        url: "https://lit-fortress-6467.herokuapp.com/post",
        method: "POST",
        data: coll
      });
      console.log(coll);

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
