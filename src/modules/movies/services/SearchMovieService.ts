import { inject, injectable } from 'tsyringe'
import IMoviesRepository from '../repositories/IMoviesRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import IVotationsRepository from '../repositories/IVotationsRepository'
import Votation from '../infra/typeorm/entities/Votation'

interface IRequestDTO {
  user_id: string
  movie_id: string
  voting: number
}

@injectable()
class SearchMovieService {
  constructor (
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('VotationsRepository')
    private votationsRepository: IVotationsRepository
  ) {}

  public async execute ({ user_id, movie_id, voting }: IRequestDTO): Promise<Votation> {
    if (voting > 4) {
      throw new AppError('voting number not can be more than 4')
    }
    const user = await this.usersRepository.findById(user_id)
    if (user?.status === 0) {
      throw new AppError('This operation could not be performed')
    }

    const movie = await this.moviesRepository.findById(movie_id)
    if (!movie) {
      throw new AppError('Invalid movie ID')
    }

    const userAlreadyVoted = await this.votationsRepository.findByUserId(String(user?.id))
    if (userAlreadyVoted) {
      // TODO
      console.log(userAlreadyVoted)
    }
    const votationExists = await this.votationsRepository.findByMovieId(movie_id)
    if (votationExists) {
      votationExists.quantity += voting
      await this.votationsRepository.save(votationExists)
      return votationExists
    }

    const votation = await this.votationsRepository.create({
      movie_id,
      user_id,
      voting
    })
    return votation
  }
}

export default SearchMovieService
