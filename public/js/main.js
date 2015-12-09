$("#rr").click(function() {
  var getter = $.ajax({
    url: "https://lit-fortress-6467.herokuapp.com/object",
    method: "GET",
    dataType: "json"
  });

  getter.done(function(response) {
    console.log(getter.responseText);
  });

  getter.fail(function(response) {
    console.log("Error!");
  });
});

$("#clear").click(function() {
  var getter = $.ajax({
    url: "https://lit-fortress-6467.herokuapp.com/object",
    method: "GET",
    dataType: "json"
  });

  getter.done(function(response) {
    console.log(getter.responseText);
  });

  getter.fail(function(response) {
    console.log("Error!");
  });
});

$("#send").click(function() {
  var poster = $.ajax({
    url: "https://lit-fortress-6467.herokuapp.com/post",
    method: "POST",
    data: {}
  });

  poster.done(function(response) {
    console.log(poster.responseText);
  });

  poster.fail(function(response) {
    console.log("Error!");
  });
});
