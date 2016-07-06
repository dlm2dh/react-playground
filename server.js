var fs = require("fs");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var MESSAGES_FILE = path.join(__dirname, "messages.json");

app.set("port", (process.env.PORT || 3000));

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.get("/api/messages", function(req, res) {
  fs.readFile(MESSAGES_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.json(JSON.parse(data));
  });
});

app.post("/api/messages", function(req, res) {
  fs.readFile(MESSAGES_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    var messages = JSON.parse(data);

    var newMessage = {
      id : Date.now(),
      author : req.body.author,
      text : req.body.text
    };

    messages.push(newMessage);
    fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      res.json(messages);
    });
  });
});

app.listen(app.get("port"), function() {
  console.log("Server listening on port: " + app.get("port"));
});
