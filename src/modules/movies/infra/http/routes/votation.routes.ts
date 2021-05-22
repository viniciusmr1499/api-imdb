import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import VotationsController from '../controllers/VotationsController'

import ensureAuthenticateUserCommon from '@modules/movies/infra/http/middlewares/ensureAuthenticateUserCommon'

const votationRouter = Router()
const votationsController = new VotationsController()

votationRouter.use(ensureAuthenticateUserCommon)

votationRouter.get('/', votationsController.index)
votationRouter.post('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required()
  },
  [Segments.BODY]: {
    voting: Joi.number().required()
  }
}), votationsController.create)

export default votationRouter
