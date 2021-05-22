import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import VotationsController from '../controllers/VotationsController'

import ensureAuthenticateUserCommon from '@modules/movies/infra/http/middlewares/ensureAuthenticateUserCommon'

const movieRouter = Router()
const votationsController = new VotationsController()

movieRouter.use(ensureAuthenticateUserCommon)

movieRouter.post('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required()
  },
  [Segments.BODY]: {
    voting: Joi.number().required()
  }
}), votationsController.create)

export default movieRouter
