import ICreateVotationDTO from '../dtos/ICreateVotationDTO'
import Votation from '../infra/typeorm/entities/Votation'

export default interface IVotationsRepository {
  findByMovieId(movie_id: string): Promise<Votation | undefined>
  findByUserId(user_id: string): Promise<Votation | undefined>
  create(data: ICreateVotationDTO): Promise<Votation>
  save(movie: Votation): Promise<Votation>
}
