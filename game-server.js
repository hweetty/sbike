
var url   = require("url");
var http = require("http");
var express = require('express');
var app = express();
var server = http.createServer(app);


var model = require("./model.js");
model.init(server);


// Configure packages
app.configure(function() {
  app.use('/static', express.static('./static'));
});



app.get("/index.html", function(req, res)
{
  var fs = require("fs");
  var fileStream = fs.createReadStream("./static/index.html");
        fileStream.pipe(res);
});

app.get("/phone/addPhone", function(req, res)
{
  console.log("check");
  res.set('Content-Type', 'text/html');
  var u = url.parse(req.url);
  var q = req.query;
console.log(q);
  var phoneId = model.addPhoneToGame(parseInt(q.gameId));
  console.log("phone idL : " + phoneId);
  res.send(""+phoneId);
});

app.get("/phone/sendEvent", function(req, res)
{
  res.set('Content-Type', 'text/html');
  var u = url.parse(req.url);
  var q = req.query;

  model.sendEventToGame(q, q.gameId);

  res.send("event s");
});


app.get("/*", function(req, res)
{
  res.redirect ("/index.html");
});


server.listen(1234);
