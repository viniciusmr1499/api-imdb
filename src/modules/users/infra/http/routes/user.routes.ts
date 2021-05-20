import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import UsersController from '../controllers/UsersController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}), usersController.create)

usersRouter.delete('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required()
  }
}), ensureAuthenticated, usersController.delete)

export default usersRouter
