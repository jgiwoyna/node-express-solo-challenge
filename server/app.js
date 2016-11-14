var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded( { extended: false } );
var path = require('path');

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log('server up on:', port);
});

app.get('/', function(req, res){
  res.sendFile(path.resolve('server/public/views/index.html'));
});

app.use(express.static('server/public'));

// initial jokes provided by the client
var jokes = [
  {
    whoseJoke: "Huck",
    jokeQuestion: "What's the difference between roast beef and pea soup?",
    punchLine: "Anyone can roast beef."
  },
  {
    whoseJoke: "Kris",
    jokeQuestion: "How many software engineers does it take to change a lightbulb?",
    punchLine: "None! That's a hardware problem!"
  },
  {
    whoseJoke: "Luke",
    jokeQuestion: "Friends are like snow flakes...",
    punchLine: "If you pee on them they disappear."
  }
];

app.post('/jokes', function(req, res){
  console.log(req.body);
  var newJoke = req.body;
  res.sendStatus(200);
});

app.get('/jokes', function(req, res){
  console.log('get dem jokes');
  res.send(jokes);
});

app.get('/*', function(req, res) {
  var file = req.params[0] || '/server/public/views/index.html';
  console.log(file);

  res.sendFile(path.join(__dirname, './server/public/', file));
  // /public/views/index.html
});
