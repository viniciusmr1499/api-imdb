import { inject, injectable } from 'tsyringe'
import Movie from '../infra/typeorm/entities/Movie'
import IMoviesRepository from '../repositories/IMoviesRepository'

interface IRequestDTO {
  name: string
  director: string
  genre: string
  description: string
}

@injectable()
class CreateMovieService {
  constructor (
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository
  ) {}

  public async execute ({ name, director, genre, description }: IRequestDTO): Promise<Movie> {
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
