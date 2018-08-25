'use strict';

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _bot = require('./bot.js');

var _role = require('./actions/role');

var _role2 = _interopRequireDefault(_role);

var _roll = require('./actions/roll');

var _roll2 = _interopRequireDefault(_roll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authConfig = _config2.default.get('Auth');

(0, _bot.use)(_role2.default);
(0, _bot.use)(_roll2.default);

(0, _bot.start)(authConfig.token);