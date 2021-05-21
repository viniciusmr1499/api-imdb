import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import MoviesController from '../controllers/MoviesController'

import ensureAuthenticatedAdmin from '@modules/movies/infra/http/middlewares/ensureAuthenticateAdmin'

const movieRouter = Router()
const moviesController = new MoviesController()

movieRouter.use(ensureAuthenticatedAdmin)

movieRouter.get('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    director: Joi.string(),
    genre: Joi.string(),
    description: Joi.string()
  }
}), moviesController.index)
movieRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    director: Joi.string().required(),
    genre: Joi.string().required(),
    description: Joi.string().required()
  }
}), moviesController.create)

export default movieRouter
