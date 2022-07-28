import express, {Request, Response} from 'express';
import ServiceService from '../service/service.service';

const router = express.Router();
const service = new ServiceService();

router.get("/", async (req: Request, res: Response) => {
    try {
        const _res = await service.list();
        res.status(200).json(_res);
    } catch (err) {
        res.status(400).json(err);
    }
});

export default router;