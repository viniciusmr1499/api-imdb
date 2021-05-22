import { container } from 'tsyringe'
import { Response, Request } from 'express'
import SearchMovieService from '@modules/movies/services/SearchMovieService'

class VotationsController {
  public async create (request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { id: movie_id } = request.params
    const { voting } = request.body
    const searchMovie = container.resolve(SearchMovieService)
    const movie = await searchMovie.execute({
      movie_id,
      user_id,
      voting
    })
    return response.json(movie)
  }
}

export default VotationsController
