'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAME = 'Role';

var ROLES = _config2.default.get('Roles');
var ROLES_LOWERCASE = {};
var HELP_MESSAGE = '`!role` enables you to set your own roles to access game specific areas of the server using the `!role grant <role name>` and `!role revoke <role name>` commands. Try `!role list` to see what roles you can self-assign!';

var ROLES_LIST_MESSAGE = '';

function initialize() {
  // initialize the map of lowercase names to proper names
  for (var key in ROLES) {
    ROLES_LOWERCASE[key.toLowerCase()] = key;
  }

  // initialize the list of ROLES
  ROLES_LIST_MESSAGE = Object.keys(ROLES).map(function (role) {
    return '**' + role + '**';
  }).join(', ');
}

function process(message) {
  if (message.content.startsWith('!role help')) {
    message.channel.send(HELP_MESSAGE);
  } else if (message.content.startsWith('!role list')) {
    message.channel.send(ROLES_LIST_MESSAGE);
  } else if (message.content.startsWith('!role')) {
    // if a user is mentioned lets target them for role mutations
    var user = message.mentions.users.first();
    var selfTargeted = false;
    if (!user) {
      // if there's no user mentioned target the author
      user = message.author;
      selfTargeted = true;
    }

    var member = message.guild.member(user);

    if (member) {
      var tokens = message.content.split(' ');
      if (tokens.includes('grant')) {
        grantRoles(member, tokens, message.member, message);
      } else if (tokens.includes('revoke')) {
        revokeRoles(member, tokens, message.member, message);
      }
    } else {
      // The mentioned user isn't in this guild
      message.reply('That user isn\'t in this guild!');
    }
  }
}

/**
 * Attempts to grant roles to the provided member
 * `member` is the member that the roles should be granted to
 * `tokens` is an array of strings, which may map to role IDs in the ROLES constant
 * `roleGiver` is the member requesting for the roles to be added
 * `message` is the message object that prompted this action
 */
function grantRoles(member, tokens, roleGiver, message) {
  for (var index in tokens) {
    var token = tokens[index].toLowerCase();
    if (ROLES_LOWERCASE[token]) {
      (function () {
        var roleName = ROLES_LOWERCASE[token];
        console.log('attempting to grant ' + roleName + ' to ' + member.displayName + ' on request of ' + message.author.toString());
        member.addRole(ROLES[roleName]).then(function () {
          if (member == roleGiver) {
            message.reply('you have been granted the **' + roleName + '** role');
          } else {
            message.reply('granted the **' + roleName + '** role to ' + member.toString());
          }
        }).catch(function (error) {
          var response = 'could not give @' + member.displayName + ' the role' + roleName;
          console.error(response);
          console.error(error);
          message.reply(response);
        });
      })();
    }
  }
}

/**
 * Attempts to remove roles to the provided member
 * `member` is the member that the roles should be granted to
 * `tokens` is an array of strings, which may map to role IDs in the ROLES constant
 * `roleGiver` is the member requesting for the roles to be added
 * `message` is the message object that prompted this action
 */
function revokeRoles(member, tokens, roleGiver, message) {
  for (var index in tokens) {
    var token = tokens[index].toLowerCase();
    if (ROLES_LOWERCASE[token]) {
      (function () {
        var roleName = ROLES_LOWERCASE[token];
        console.log('attempting to revoke ' + roleName + ' from ' + member.displayName + ' on request of ' + message.author.toString());
        member.removeRole(ROLES[roleName]).then(function () {
          if (member == roleGiver) {
            message.reply('you have been revoked the **' + roleName + '** role');
          } else {
            message.reply('revoked the **' + roleName + '** role from ' + member.toString());
          }
        }).catch(function (error) {
          var response = 'could not revoke @' + member.toString() + ' the role' + roleName;
          console.error(response);
          console.error(error);
          message.reply(response);
        });
      })();
    }
  }
}

exports.default = { process: process, initialize: initialize, NAME: NAME };