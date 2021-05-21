import { Router } from 'express'

import sessions from '@modules/users/infra/http/routes/sessions.routes'
import users from '@modules/users/infra/http/routes/user.routes'
import profile from '@modules/users/infra/http/routes/profile.routes'
import movies from '@modules/movies/infra/http/routes/movies.routes'

const routes = Router()

routes.use('/users', users)
routes.use('/sessions', sessions)
routes.use('/profile', profile)
routes.use('/movies', movies)

export default routes
