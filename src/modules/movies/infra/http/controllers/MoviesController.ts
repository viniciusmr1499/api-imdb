import { container } from 'tsyringe'
import { Response, Request } from 'express'
import CreateMovieService from '@modules/movies/services/CreateMovieService'

class MoviesController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { name, director, genre, description } = request.body
    const createMovie = container.resolve(CreateMovieService)
    const movie = await createMovie.execute({
      name,
      director,
      description,
      genre
    })

    return response.json(movie)
  }
}

export default MoviesController
