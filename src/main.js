import config from 'config'
let authConfig = config.get('Auth')

import { start, use } from './bot.js'
import role from './actions/role'
import roll from './actions/roll'

use(role)
use(roll)

start(authConfig.token)
