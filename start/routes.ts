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

router.post('/users/register', [UsersController, 'register'])
router.post('/auth/login', [SessionController, 'store'])
router.get('/users/account', [AccountController, 'show']).use(middleware.auth())
router.post('/events', [EventsController, 'createEvent']).use(middleware.auth())
router.post('/events/display', [EventsController, 'display']).use(middleware.auth())
router.get('/events/display/event/:id', [EventsController, 'displayEvent']).use(middleware.auth())
router.post('/events/display/userevents', [EventsController, 'userEvents']).use(middleware.auth())
router.get('/events/display/attend', [EventsController, 'attend']).use(middleware.auth())
router.post('/events/join', [EventsController, 'join']).use(middleware.auth())
router.post('/events/leave', [EventsController, 'leave']).use(middleware.auth())
router.post('/events/update', [EventsController, 'update']).use(middleware.auth())
router
  .get('/auth', async ({ auth, response }) => {
    if (!auth.isAuthenticated) {
      return response.unauthorized({ message: 'Not logged in' })
    }

    return response.status(200).json({ message: 'User is logged in.' })
  })
  .use(async ({ auth }, next) => {
    await auth.check()
    return next()
  })
router
  .post('/auth/logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    return response.redirect('/')
  })
  .use(middleware.auth())
