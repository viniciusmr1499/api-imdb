import ICreateVotationDTO from '../dtos/ICreateVotationDTO'
import Votation from '../infra/typeorm/entities/Votation'

export default interface IVotationsRepository {
  find(): Promise<Votation[]>
  findByMovieId(movie_id: string): Promise<Votation[]>
  findByUserId(user_id: string): Promise<Votation | undefined>
  findByVotes(user_id: string, id_movie: string): Promise<Votation | undefined>
  create(data: ICreateVotationDTO): Promise<Votation>
  save(movie: Votation): Promise<Votation>
}
