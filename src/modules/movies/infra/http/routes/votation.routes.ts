import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import VotationsController from '../controllers/VotationsController'

import ensureAuthenticatedAdmin from '@modules/movies/infra/http/middlewares/ensureAuthenticateAdmin'

const movieRouter = Router()
const votationsController = new VotationsController()

movieRouter.use(ensureAuthenticatedAdmin)

movieRouter.post('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required()
  },
  [Segments.BODY]: {
    voting: Joi.number().required()
  }
}), votationsController.create)

export default movieRouter
