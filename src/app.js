
var express = require("express");
var EventEmitter  = require("events");
var config = require("./config.js").twitterConfig;

var app = express();
var eventEmitter = new EventEmitter();
var Twitter = require('twitter-node-client').Twitter;

var user = null;
var userId = null;
var timeline = null;
var friends = null;
var messages = null;

var twitter = new Twitter(config);

var error = function (err, response, body) {
    console.dir(err);
};

var twitterTimelineSuccess = function (data) {
  var JSONdata = JSON.parse(data);
  timeline = JSONdata;
  twitter.getCustomApiCall('/friends/list.json',{ id: config.twitterId, count: config.friendsCount}, error, twitterFriendSuccess);
}

var twitterFriendSuccess = function (data) {
  var JSONdata = JSON.parse(data);
  friends = JSONdata;
  twitter.getCustomApiCall('/direct_messages.json',{count: config.messageCount},error,twitterMessagesSuccess);
}

var twitterMessagesSuccess = function (data) {
  var JSONdata = JSON.parse(data);
  messages = JSONdata.reverse();
  eventEmitter.emit("twitterData");
}

function getTwitterData () {
  twitter.getUserTimeline({id: config.twitterId, count: twitter.timelineCount}, error, twitterTimelineSuccess);
}

eventEmitter.on("twitterData",function () {
  app.get("/", function(req,res){
    res.locals.timeline = timeline;
    res.locals.friends = friends.users;
    res.locals.messages = messages;
    res.locals.profile_image_url = timeline[0].user.profile_image_url;
    res.locals.screen_name = timeline[0].user.screen_name;
    res.render("index");
  });
});

getTwitterData();

app.use("/static", express.static(__dirname + "/public"));

app.set("view engine", "jade");
app.set("views", __dirname + "/views");

app.listen(3000,function(){
  console.log("running app at localhost:3000");
});
