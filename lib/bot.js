'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Discord = require('discord.js');
var client = new Discord.Client();

var subscribers = [];

function logMessage(message) {
  // console.log(message.content);
  // console.log(message.guild.roles)
  // console.log(Object.keys(message))
  // console.log(message.author)
}

function handleMessage(message) {
  subscribers.forEach(function (sub) {
    return sub.process(message);
  });
}

var use = function use(sub) {
  console.log('registering an actor: ' + sub.NAME);
  if (sub.initialize) {
    sub.initialize();
  }
  subscribers.push(sub);
};

var start = function start(authToken) {
  client.on('ready', function () {
    console.log('Ready!');
  });

  client.on('message', function (message) {
    if (!message.guild) return; // ignore messages outside of servers
    // TODO: get clientID programmatically so it does not have to be stored in config
    if (message.author.id !== client.user.id) {
      // don't handle own messages
      logMessage(message);
      handleMessage(message);
    }
  });

  client.login(authToken);
};

exports.use = use;
exports.start = start;
// https://discordapp.com/oauth2/authorize?client_id=482345858658992128&scope=bot