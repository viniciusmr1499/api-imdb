import { inject, injectable } from 'tsyringe'
import Movie from '../infra/typeorm/entities/Movie'
import IMoviesRepository from '../repositories/IMoviesRepository'

interface IRequestDTO {
  name: string | string[] | ParsedQs | ParsedQs[] | undefined
  director: string | string[] | ParsedQs | ParsedQs[] | undefined
  genre: string | string[] | ParsedQs | ParsedQs[] | undefined
}

@injectable()
class GetMovieService {
  constructor (
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository
  ) {}

  public async execute ({ name, director, genre }: IRequestDTO): Promise<Movie | Movie[] | undefined> {
    const movies = await this.moviesRepository.find({
      name,
      director,
      genre
    })

    return movies
  }
}

export default GetMovieService
