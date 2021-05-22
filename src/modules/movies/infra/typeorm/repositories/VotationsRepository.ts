import { getRepository, Repository } from 'typeorm'

import Votation from '@modules/movies/infra/typeorm/entities/Votation'
import ICreateVotationDTO from '@modules/movies/dtos/ICreateVotationDTO'
import IVotationsRepository from '@modules/movies/repositories/IVotationsRepository'

class VotationsRepository implements IVotationsRepository {
    private ormRepository: Repository<Votation>;

    constructor () {
      this.ormRepository = getRepository(Votation)
    }

    public async find (): Promise<Votation[]> {
      const votations = await this.ormRepository.find()
      return votations
    }

    public async findByMovieId (movie_id: string): Promise<Votation[]> {
      const votation = await this.ormRepository.find({
        where: {
          movie_votations_id: movie_id
        }
      })
      return votation
    }

    public async findByVotes (user_id: string, movie_id: string): Promise<Votation | undefined> {
      const votation = await this.ormRepository.findOne({
        where: {
          movie_votations_id: movie_id,
          user_votations_id: user_id
        }
      })
      return votation
    }

    public async findByUserId (user_id: string): Promise<Votation | undefined> {
      const votation = await this.ormRepository.findOne({
        where: {
          user_votations_id: user_id
        }
      })
      return votation
    }

    public async create ({ movie_id, user_id, voting }: ICreateVotationDTO): Promise<Votation> {
      const votation = this.ormRepository.create({
        movie_votations_id: movie_id,
        user_votations_id: user_id,
        value_voting: voting
      })

      await this.ormRepository.save(votation)

      return votation
    }

    public async save (votation: Votation): Promise<Votation> {
      return this.ormRepository.save(votation)
    }
}

export default VotationsRepository
