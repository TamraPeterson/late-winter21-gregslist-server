import BaseController from '../utils/BaseController'
import { jobsService } from '../services/JobsService'
import { Auth0Provider } from '@bcwdev/auth0provider'



export class JobsController extends BaseController {
  constructor() {
    super('api/jobs')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const jobs = await jobsService.getAll(req.query)
      return res.send(jobs)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const job = await jobsService.create(req.body)
      return res.send(job)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const jobId = req.params.id
      await jobsService.remove(jobId, userId)
      return res.send('delorted')
    } catch (error) {
      next(error)
    }
  }
}