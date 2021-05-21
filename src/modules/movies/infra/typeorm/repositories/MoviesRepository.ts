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
    } else {
      const movies = this.ormRepository
        .createQueryBuilder('movies')
        .select(['name', 'genre', 'director', 'created_at'])
        .where('name = :name', { name })
        .orWhere('director = :director', { director })
        .orWhere('genre = :genre', { genre })
        .getRawMany()

      return movies
    }
  }

  // public async findByName (name: string): Promise <Movie[] | undefined> {
  //   const movie = this.ormRepository.find({
  //     where: { name }
  //   })

  //   return movie
  // }

  // public async findByDirector (director: string): Promise <Movie[] | undefined> {
  //   const movie = this.ormRepository.find({
  //     where: { director }
  //   })

  //   return movie
  // }

  // public async findByGenre (genre: string): Promise <Movie[] | undefined> {
  //   const movie = this.ormRepository.find({
  //     where: { genre }
  //   })

  //   return movie
  // }

  // public async findAll (): Promise <Movie[]> {
  //   const movies = this.ormRepository.find()
  //   return movies
  // }

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
