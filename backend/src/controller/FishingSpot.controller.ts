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
        const fishingSpot = await this.fishingSpotService.getFishingSpot(req.params.id)
        if (!fishingSpot) {
            res.status(404).send({ message: 'FishingSpot not found' })
            return
        }
        res.send(fishingSpot)
    }

    private getFishingSpots = async (req: Request, res: Response) => {
        const fishingSpots = await this.fishingSpotService.getFishingSpots()
        if (!fishingSpots) {
            res.status(404).send({ message: 'FishingSpots not found' })
            return
        }
        res.send(fishingSpots)
    }

    private addFishingSpot = async (req: RequestWithUser, res: Response) => {
        const fishingSpot = req.body
        if (
            !fishingSpot ||
            !fishingSpot.name ||
            !fishingSpot.longitude ||
            !fishingSpot.latitude ||
            !fishingSpot.description ||
            !fishingSpot.rating ||
            !fishingSpot.type ||
            !fishingSpot.image
        ) {
            res.status(400).send({ message: 'Invalid fishingSpot' })
            return
        }
        const authorId = req.user?._id
        if (!authorId) {
            res.status(401).send({ message: 'Access Denied: No Token Provided!' })
            return
        }
        const newFishingSpot = await this.fishingSpotService.addFishingSpot(fishingSpot, authorId)
        if (!newFishingSpot) {
            res.status(400).send({ message: 'FishingSpot not created' })
            return
        }
        res.send(newFishingSpot)
    }
}

export { FishingSpotController }
