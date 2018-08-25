const Discord = require('discord.js')
const client = new Discord.Client()

let subscribers = []

function logMessage(message) {
  // console.log(message.content);
  // console.log(message.guild.roles)
  // console.log(Object.keys(message))
  // console.log(message.author)
}

function handleMessage(message) {
  subscribers.forEach(sub => sub.process(message))
}

let use = function (sub) {
  console.log('registering an actor: ' + sub.NAME)
  if (sub.initialize) {
    sub.initialize()
  }
  subscribers.push(sub)
}

let start = function (authToken) {
  client.on('ready', () => {
      console.log('Ready!')
  })

  client.on('message', message => {
    if (!message.guild) return // ignore messages outside of servers
    // TODO: get clientID programmatically so it does not have to be stored in config
    if (message.author.id !== client.user.id) { // don't handle own messages
      logMessage(message)
      handleMessage(message)
    }
  })

  client.login(authToken)
}

export { use, start }
// https://discordapp.com/oauth2/authorize?client_id=482345858658992128&scope=bot
