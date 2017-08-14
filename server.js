// server.js
// where your node app starts

/*
User Story: I can submit a FormData object that includes a file upload.
User Story: When I submit something, I will receive the file size in bytes within the JSON response
*/

// init project
var express = require('express');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({storage: storage});
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", upload.single('fileSize'), function (request, response) {
  let fileObj = request.file;
    if (request.file) {
      console.log('theres a file in there: ', fileObj);
      response.send({size: fileObj.size})
    }
  response.sendStatus(200);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
