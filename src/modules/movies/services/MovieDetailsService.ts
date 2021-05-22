import { inject, injectable } from 'tsyringe'

import IMoviesRepository from '../repositories/IMoviesRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import AppError from '@shared/errors/AppError'
import IVotationsRepository from '../repositories/IVotationsRepository'

interface IRequestDTO {
  movie_id: string
  user_id: string
}

interface IResponse {
  movie: any
  average: number
}

@injectable()
class MovieDetailsService {
  constructor (
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('VotationsRepository')
    private votationsRepository: IVotationsRepository
  ) {}

  public async execute ({ movie_id, user_id }: IRequestDTO): Promise<IResponse | undefined> {
    const user = await this.usersRepository.findById(user_id)
    if (user?.status === 0) {
      throw new AppError('This operation could not be performed')
    }

    const movie = await this.moviesRepository.findById(movie_id)
    if (!movie) {
      throw new AppError('Invalid movie ID')
    }

    const votations = await this.votationsRepository.findByMovieId(movie_id)
    const accumulatedVotes = votations.reduce((prevVal, elem) => {
      return prevVal + elem.value_voting
    }, 0)

    const result: IResponse = {
      movie,
      average: accumulatedVotes === 0 ? 0 : Number((accumulatedVotes / movie.total_votes).toFixed(1))
    }

    return result
  }
}

export default MovieDetailsService
