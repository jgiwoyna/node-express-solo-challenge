console.log('js loaded');

$(document).ready(function (){

  $("#jokes").on("click", function(event) {
    event.preventDefault();
    var newJoke = {};

    $.each($('#jokes').serializeArray(), function(i, field) {
      newJoke[field.name] = field.value;
    });

    var newJoke = {};

    $.ajax ({
      type: 'POST',
      url: '/jokes',
      data: newJoke,
      success: function(response){
        if (response == "created") {
          getJokes();
        } else {
          alert("didn't work");
        }

      }
    });

  });

      getJokes();

      function getJokes () {
        console.log("joke");
        $.ajax({
          type: 'GET',
          url: '/jokes',
          success: function(jokeData) {
            console.log(jokeData);
            jokesToDom(jokeData);
          }
        });
      }

      function jokesToDom(jokes){
        // $("#jokes").empty();
        for (var i = 0; i < jokes.length; i++) {
          $("#jokes").append('<div class="joke"></div>');
          var $el = $("#jokes").children().last();
          $el.append('<h3>' + jokes[i].whoseJoke + '</h3>');
          $el.append('<p>' + jokes[i].jokeQuestion + '</p>');
          $el.append('<p>' + jokes[i].punchLine + '</p>');
          console.log(jokes);
        }
      };

});
