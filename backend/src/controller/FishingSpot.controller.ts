import { Request, Response, Router } from 'express'
import { FishingSpotService } from '../service'
import { RequestWithUser, verifyTokenMiddleware } from '../middleware/Auth.middleware'

class FishingSpotController {
    public router: Router
    private path: string = '/fishingSpot'
    private fishingSpotService: FishingSpotService

    constructor() {
        this.router = Router()
        this.fishingSpotService = new FishingSpotService()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.get(`${this.path}/:id`, this.getFishingSpot)
        this.router.get(`${this.path}`, this.getFishingSpots)
        this.router.post(`${this.path}`, verifyTokenMiddleware, this.addFishingSpot)
    }

    private getFishingSpot = async (req: Request, res: Response) => {
        const result = await this.fishingSpotService.getFishingSpot(req.params.id)
        if (result.error) {
            return res.status(result.code).send({ error: result.error })
        }
        res.send(result.data)
    }

    private getFishingSpots = async (req: Request, res: Response) => {
        const result = await this.fishingSpotService.getFishingSpots()
        if (result.error) {
            return res.status(result.code).send({ error: result.error })
        }
        res.send(result.data)
    }

    private addFishingSpot = async (req: RequestWithUser, res: Response) => {
        const fishingSpotData = req.body
        if (
            !fishingSpotData ||
            !fishingSpotData.name ||
            !fishingSpotData.longitude ||
            !fishingSpotData.latitude ||
            !fishingSpotData.description ||
            !fishingSpotData.rating ||
            !fishingSpotData.type ||
            !fishingSpotData.image
        ) {
            return res.status(400).send({ error: 'Invalid fishingSpot data' })
        }
        const authorId = req.user?._id
        if (!authorId) {
            return res.status(401).send({ error: 'Access Denied: No Token Provided!' })
        }
        const result = await this.fishingSpotService.addFishingSpot(fishingSpotData, authorId)
        if (result.error) {
            return res.status(result.code).send({ error: result.error })
        }
        res.status(201).send(result.data)
    }
}

export { FishingSpotController }
