import { inject, injectable } from 'tsyringe'
import Movie from '../infra/typeorm/entities/Movie'
import IMoviesRepository from '../repositories/IMoviesRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'

interface IRequestDTO {
  name: string | string[] | ParsedQs | ParsedQs[] | undefined
  director: string | string[] | ParsedQs | ParsedQs[] | undefined
  genre: string | string[] | ParsedQs | ParsedQs[] | undefined
  user_id: string
}

@injectable()
class GetMoviesService {
  constructor (
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute ({ name, director, genre, user_id }: IRequestDTO): Promise<Movie | Movie[] | undefined> {
    const user = await this.usersRepository.findById(user_id)
    if (user?.status === 0) {
      throw new AppError('This operation could not be performed')
    }

    const movies = await this.moviesRepository.find({
      name,
      director,
      genre
    })

    return movies
  }
}

export default GetMoviesService
