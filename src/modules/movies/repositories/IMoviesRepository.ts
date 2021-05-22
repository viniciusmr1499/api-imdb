import Movie from '@modules/movies/infra/typeorm/entities/Movie'
import ICreateMoviesDTO from '../dtos/ICreateMoviesDTO'
import IGetMoviesDTO from '../dtos/IGetMoviesDTO'

export default interface IUsersRepository {
  find(data: IGetMoviesDTO): Promise<Movie[]>
  findById(id: string): Promise<Movie | undefined>
  create(data: ICreateMoviesDTO): Promise<Movie>
  save(movie: Movie): Promise<Movie>
}
