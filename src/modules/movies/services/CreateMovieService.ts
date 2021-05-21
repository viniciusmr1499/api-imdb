import { inject, injectable } from 'tsyringe'
import Movie from '../infra/typeorm/entities/Movie'
import IMoviesRepository from '../repositories/IMoviesRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'

interface IRequestDTO {
  name: string
  director: string
  genre: string
  description: string
  user_id: string
}

@injectable()
class CreateMovieService {
  constructor (
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute ({ name, director, genre, description, user_id }: IRequestDTO): Promise<Movie> {
    const user = await this.usersRepository.findById(user_id)
    if (user?.status === 0) {
      throw new AppError('This operation could not be performed')
    }

    const movie = await this.moviesRepository.create({
      name,
      director,
      genre,
      description
    })

    return movie
  }
}

export default CreateMovieService
