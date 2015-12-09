$(document).ready(function() {
  var getter = $.ajax({
    url: "https://lit-fortress-6467.herokuapp.com/object",
    method: "GET",
    dataType: "json"
  });

  getter.done(function(response) {
    getAllAlbumCovers(response);
  });

  getter.fail(function(response) {
    console.log("Error getting JSON!");
  });
});

function getAllAlbumCovers(response) {
  for(var i = 0; i < response["results"].length; i++) {
    $("#albumarea").append("<img class='album' src='images/" + response["results"][i]["cover_art"] + "'>");
  }
};
