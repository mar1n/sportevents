/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/users/:username', [UsersController, 'index'])
router.post('/users', [UsersController, 'store'])
router.post('/users/register', [AuthController, 'register'])
