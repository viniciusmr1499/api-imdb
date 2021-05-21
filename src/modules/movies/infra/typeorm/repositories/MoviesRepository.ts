import { Repository, getRepository } from 'typeorm'
import Movie from '@modules/movies/infra/typeorm/entities/Movie'
import ICreateMoviesDTO from '@modules/movies/dtos/ICreateMoviesDTO'
import IMoviesRepository from '@modules/movies/repositories/IMoviesRepository'
import IGetMoviesDTO from '@modules/movies/dtos/IGetMoviesDTO'

class MoviesRepository implements IMoviesRepository {
  private ormRepository: Repository<Movie>

  constructor () {
    this.ormRepository = getRepository(Movie)
  }

  public async find ({ director, name, genre }: IGetMoviesDTO): Promise <Movie[]> {
    if (
      director === undefined && name === undefined && genre === undefined ||
      director === '' && name === '' && genre === ''
    ) {
      const movies = this.ormRepository.find()
      return movies
    }

    const movies = this.ormRepository
      .createQueryBuilder('movies')
      .select()
      .where('movies.name = :name', { name })
      .orWhere('movies.director = :director', { director })
      .orWhere('movies.genre = :genre', { genre })
      .getRawMany()

    return movies
  }

  public async create ({ name, director, description, genre }: ICreateMoviesDTO): Promise<Movie> {
    const movie = this.ormRepository.create({
      name,
      director,
      description,
      genre
    })

    await this.ormRepository.save(movie)

    return movie
  }

  public async save (movie: Movie): Promise<Movie> {
    return this.ormRepository.save(movie)
  }
}

export default MoviesRepository
