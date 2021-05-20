import { Router } from 'express'

import sessions from '@modules/users/infra/http/routes/sessions.routes'
import users from '@modules/users/infra/http/routes/user.routes'
import profile from '@modules/users/infra/http/routes/profile.routes'

const routes = Router()

routes.use('/users', users)
routes.use('/sessions', sessions)
routes.use('/profile', profile)

export default routes
