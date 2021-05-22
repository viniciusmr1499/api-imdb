import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import UsersController from '../controllers/UsersController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/', ensureAuthenticated, usersController.index)
usersRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    level: Joi.number()
  }
}), usersController.create)

export default usersRouter
