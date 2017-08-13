// server.js
// where your node app starts

/*
User Story: I can submit a FormData object that includes a file upload.
User Story: When I submit something, I will receive the file size in bytes within the JSON response

Need to-
when file is added:
  Append file to FormData object
when submit is pressed:
  Submit FormData object to the server
  Read size of the file/FormData object
  Send size as response
  
*/

// init project
var express = require('express');
var multer = require('multer');
var upload = multer();
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(multer({
  dest: "./dreams",
  limits: {
    files: 1
  },
  inMemory: true
}))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/", upload.single('fileSize'), function (request, response) {
  let form = request.file;
    if (request.file) {
      console.log('theres a file in there: ', form);
    }
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
