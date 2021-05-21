import { container } from 'tsyringe'
import { Response, Request } from 'express'
import CreateMovieService from '@modules/movies/services/CreateMovieService'
import GetMovieService from '@modules/movies/services/GetMovieService'

class MoviesController {
  public async index (request: Request, response: Response): Promise<Response> {
    const { director, name, genre } = request.query
    const getMovie = container.resolve(GetMovieService)
    const movies = await getMovie.execute({
      name,
      director,
      genre
    })

    return response.json(movies)
  }

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
