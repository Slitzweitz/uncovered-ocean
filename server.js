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
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './tmp/my-uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
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

app.get("/tmp/my-uploads/", (req, res) => {
  console.log(req.file);
  res.sendStatus(200);
})

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", upload.single('fileSize'), function (request, response) {
  let fileObj = request.file;
    if (request.file) {
      console.log('theres a file in there: ', fileObj);
    }
  response.sendStatus(200);
});

var uploads = [];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
