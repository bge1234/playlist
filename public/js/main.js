$(document).ready(function() {
  var getter = $.ajax({
    url: "https://lit-fortress-6467.herokuapp.com/object",
    method: "GET",
    dataType: "json"
  });

  getter.done(function(response) {
    for(var i = 0; i < 3; i++) {
      getAddRandomAlbumCover(response);
    }
  });

  getter.fail(function(response) {
    console.log("Error getting JSON!");
  });
});

$(document).ready(function() {
  var getter = $.ajax({
    url: "https://lit-fortress-6467.herokuapp.com/object",
    method: "GET",
    dataType: "json"
  });

  getter.done(function(response) {
    for(var i = 0; i < 3; i++) {
      getAddRandomAlbumCover(response);
    }
  });

  getter.fail(function(response) {
    console.log("Error getting JSON!");
  });
});

function getAddRandomAlbumCover(response) {
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

  $("#albumcovers").append("<img class='cover' src='images/" + response["results"][id]["cover_art"] + "'>");
};

//
// $("#send").click(function() {
//   var poster = $.ajax({
//     url: "https://lit-fortress-6467.herokuapp.com/post",
//     method: "POST",
//     data: {}
//   });
//
//   poster.done(function(response) {
//     console.log(poster.responseText);
//   });
//
//   poster.fail(function(response) {
//     console.log("Error posting!");
//   });
// });
