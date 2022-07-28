import express, {Request, Response} from 'express';
import PingService from '../service/ping.service';

const router = express.Router();
const pingService = new PingService();

router.get("/", (req: Request, res: Response) => {
    res.send(pingService.getPing())
});

export default router;