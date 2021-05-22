import { container } from 'tsyringe'
import { Response, Request } from 'express'
import CreateVotationService from '@modules/movies/services/CreateVotationService'

class VotationsController {
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
