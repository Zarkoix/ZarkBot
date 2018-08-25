const NAME = 'Roll'

import distributionMap from './distributions'

let config = {
  distribution: 'uniform',
  flavor: true
}

function process(message) {
  let messageTerms = message.content.split(' ')
  if (/d[0-9]+/.test(messageTerms[0])) {
    handleRoll(message, config)
  } else if (messageTerms.shift().toLowerCase() == '!roll') {
    if (messageTerms.length > 0) {
      switch (messageTerms.shift().toLowerCase()) {
        case 'set':
          handleSet(message, messageTerms, config);
          break;
        case 'list':
          handleList(message, messageTerms, config)
          break;
        case 'config':
          handleConfig(message, messageTerms, config)
          break;
      }
    } else {
      message.reply('try `d20`')
    }
  }
}

function handleRoll(message, config) {
  const n = parseInt(message.content.substring(1))
  message.channel.send('You rolled a **' + rollDie(n, config.distribution) + '**')
}

function rollDie(size, distribution) {
  if (size == 0) {
    return "∞"
  }
  if (distributionMap[distribution]) {
    return distributionMap[distribution](1, size)
  } else {
    throw new Error("no random function found for distribution: " + distribution)
  }
}

function handleSet(message, messageTerms, config) {
  switch (messageTerms.shift().toLowerCase()) {
    case 'distribution':
      let newDist = messageTerms.shift().toLowerCase()
      if (distributionMap[newDist]) {
        config.distribution = newDist
        message.channel.send('Set distribution to **' + newDist + '** 😁')
      } else {
        message.channel.send('No distribution found for **' + newDist + '**!')
      }
  }
}

function handleConfig(message, messageTerms, config) {
  message.channel.send('using a *' + config.distribution + '* distribution')
}

function handleList(message, messageTerms, config) {
  switch (messageTerms.shift().toLowerCase()) {
    case 'distributions':
      message.channel.send(Object.keys(distributionMap).join(', '))
      break;
    case 'authors':
      message.channel.send('I\'m written by @Zarkoix')
      break;
  }
}

export default { NAME, process }
