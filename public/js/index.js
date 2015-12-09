$(document).ready(function() {
  var getter = $.ajax({
    url: "https://lit-fortress-6467.herokuapp.com/object",
    method: "GET",
    dataType: "json"
  });

  getter.done(function(response) {
    var artArray = [];

    //Take album art image names into new array that we can consume as we go and not repeat any images
    for(var i = 0; i < response["results"].length; i++) {
      artArray.push(response["results"][i]["cover_art"]);
    }

    for(var i = 0; i < 3; i++) {
      var rem = getAddRandomAlbumCover(artArray);
      artArray.splice(rem, 1);
    }
  });

  getter.fail(function(response) {
    console.log("Error getting JSON!");
  });
});

function getAddRandomAlbumCover(arr) {
  var rand = Math.random();
  var id = 0;

  if(rand <= .2)
    id = 1;
  else if (rand <= .4)
    id = 2;
  else if (rand <= .6)
    id = 3;
  else if (rand <= .8)
    id =4;

  if(id >= arr.length)
    id = getAddRandomAlbumCover(arr);
  else
    $("#albumcovers").append("<img class='cover' src='images/" + arr[id] + "'>");

  return id;
};
