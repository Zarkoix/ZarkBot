'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _distributions = require('./distributions');

var _distributions2 = _interopRequireDefault(_distributions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAME = 'Roll';

var config = {
  distribution: 'uniform',
  flavor: true
};

function process(message) {
  var messageTerms = message.content.split(' ');
  if (/d[0-9]+/.test(messageTerms[0])) {
    handleRoll(message, config);
  } else if (messageTerms.shift().toLowerCase() == '!roll') {
    if (messageTerms.length > 0) {
      switch (messageTerms.shift().toLowerCase()) {
        case 'set':
          handleSet(message, messageTerms, config);
          break;
        case 'list':
          handleList(message, messageTerms, config);
          break;
        case 'config':
          handleConfig(message, messageTerms, config);
          break;
      }
    } else {
      message.reply('try `d20`');
    }
  }
}

function handleRoll(message, config) {
  var n = parseInt(message.content.substring(1));
  message.channel.send('You rolled a **' + rollDie(n, config.distribution) + '**');
}

function rollDie(size, distribution) {
  if (size == 0) {
    return "∞";
  }
  if (_distributions2.default[distribution]) {
    return _distributions2.default[distribution](1, size);
  } else {
    throw new Error("no random function found for distribution: " + distribution);
  }
}

function handleSet(message, messageTerms, config) {
  switch (messageTerms.shift().toLowerCase()) {
    case 'distribution':
      var newDist = messageTerms.shift().toLowerCase();
      if (_distributions2.default[newDist]) {
        config.distribution = newDist;
        message.channel.send('Set distribution to **' + newDist + '** 😁');
      } else {
        message.channel.send('No distribution found for **' + newDist + '**!');
      }
  }
}

function handleConfig(message, messageTerms, config) {
  message.channel.send('using a *' + config.distribution + '* distribution');
}

function handleList(message, messageTerms, config) {
  switch (messageTerms.shift().toLowerCase()) {
    case 'distributions':
      message.channel.send(Object.keys(_distributions2.default).join(', '));
      break;
    case 'authors':
      message.channel.send('I\'m written by @Zarkoix');
      break;
  }
}

exports.default = { NAME: NAME, process: process };