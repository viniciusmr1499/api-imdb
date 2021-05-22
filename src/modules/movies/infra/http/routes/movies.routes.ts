import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import MoviesController from '../controllers/MoviesController'
import ensureAuthenticatedAdmin from '@modules/movies/infra/http/middlewares/ensureAuthenticateAdmin'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const movieRouter = Router()
const moviesController = new MoviesController()

movieRouter.get('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    director: Joi.string(),
    genre: Joi.string(),
    description: Joi.string()
  }
}), ensureAuthenticated, moviesController.index)
movieRouter.get('/:movie_id', celebrate({
  [Segments.BODY]: {
    movie_id: Joi.string().required()
  }
}), ensureAuthenticated, moviesController.show)
movieRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    director: Joi.string().required(),
    genre: Joi.string().required(),
    description: Joi.string().required()
  }
}), ensureAuthenticatedAdmin, moviesController.create)

export default movieRouter
