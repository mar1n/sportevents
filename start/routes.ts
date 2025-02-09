/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { middleware } from './kernel.js'
const SessionController = () => import('#controllers/session_controller')
const UsersController = () => import('#controllers/users_controller')
const AccountController = () => import('#controllers/account_controller')
const EventsController = () => import('#controllers/events_controller')
import router from '@adonisjs/core/services/router'
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/users/:username', [UsersController, 'index'])
router.post('/users/register', [UsersController, 'register'])
router.get('/auth/login', [SessionController, 'store'])
router.get('/account', [AccountController, 'show']).use(middleware.auth())
router.post('/events', [EventsController, 'createEvent']).use(middleware.auth())
router
  .post('/auth/logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    return response.redirect('/')
  })
  .use(middleware.auth())
