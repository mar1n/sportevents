/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const SessionController = () => import('#controllers/session_controller')
const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/users/:username', [UsersController, 'index'])
router.post('/users/register', [UsersController, 'register'])
router.get('/auth/login', [SessionController, 'store'])
