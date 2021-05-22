import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IVotationsRepository from '../repositories/IVotationsRepository'
import Votation from '../infra/typeorm/entities/Votation'

@injectable()
class MovieDetailsService {
  constructor (
    @inject('VotationsRepository')
    private votationsRepository: IVotationsRepository
  ) {}

  public async execute (): Promise<Votation[]> {
    const votations = await this.votationsRepository.find()
    return votations
  }
}

export default MovieDetailsService
