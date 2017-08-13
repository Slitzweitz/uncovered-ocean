// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world from client.js :o');

  var form = document.forms.namedItem("fileinput");
  
  form.addEventListener('submit', function(ev) {

    var oOutput = document.querySelector("div"),
        oData = new FormData(form);

    var oReq = new XMLHttpRequest();
    oReq.open("POST", "stash.php", true);
    oReq.onload = function(oEvent) {
      if (oReq.status == 200) {
        oOutput.innerHTML = "Uploaded!";
      } else {
        oOutput.innerHTML = "Error " + oReq.status + " occurred when trying to upload your file.<br \/>";
      }
    };

  oReq.send(oData);
  ev.preventDefault();
}, false);

});

function sendData(file) {
  var XHR = new XMLHttpRequest();
  var FD = new FormData();
}