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

        //Output to page
        if($("#item" + elem).length === 0) {
          $("#trackoutput").append("<div class='output' id='item" + elem + "'>" + response["results"][elem]["artist"] + ": " + response["results"][elem]["title"] + "</div>");

          //Save to collection
          coll.push({
            artist: response["results"][elem]["artist"],
            title: response["results"][elem]["title"]
          });
        }
     });

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
