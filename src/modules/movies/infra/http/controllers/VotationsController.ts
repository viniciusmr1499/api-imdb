import { container } from 'tsyringe'
import { Response, Request } from 'express'
import CreateVotationService from '@modules/movies/services/CreateVotationService'
import ListVotationsService from '@modules/movies/services/ListVotationsService'

class VotationsController {
  public async index (request: Request, response: Response): Promise<Response> {
    const votationsListService = container.resolve(ListVotationsService)
    const votations = await votationsListService.execute()
    return response.json(votations)
  }

  public async create (request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { id: movie_id } = request.params
    const { voting } = request.body
    const createVotations = container.resolve(CreateVotationService)
    const votations = await createVotations.execute({
      movie_id,
      user_id,
      voting
    })
    return response.json(votations)
  }
}

export default VotationsController
