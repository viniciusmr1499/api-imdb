import { container } from 'tsyringe'
import { Response, Request } from 'express'
import CreateMovieService from '@modules/movies/services/CreateMovieService'
import GetMoviesService from '@modules/movies/services/GetMoviesService'
import MovieDetailsService from '@modules/movies/services/MovieDetailsService'

class MoviesController {
  public async index (request: Request, response: Response): Promise<Response> {
    const { director, name, genre } = request.query
    const getMovies = container.resolve(GetMoviesService)
    const user_id = request.user.id
    const movies = await getMovies.execute({
      name,
      director,
      genre,
      user_id
    })

    return response.json(movies)
  }

  public async create (request: Request, response: Response): Promise<Response> {
    const { name, director, genre, description } = request.body
    const createMovie = container.resolve(CreateMovieService)
    const user_id = request.user.id
    const movie = await createMovie.execute({
      name,
      director,
      description,
      genre,
      user_id
    })
    return response.json(movie)
  }

  public async show (request: Request, response: Response): Promise<Response> {
    const { movie_id } = request.params
    const movieDetails = container.resolve(MovieDetailsService)
    const user_id = request.user.id
    const movie = await movieDetails.execute({
      user_id,
      movie_id
    })
    return response.json(movie)
  }
}

export default MoviesController
