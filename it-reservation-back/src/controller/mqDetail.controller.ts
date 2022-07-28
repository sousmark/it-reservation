import express, {Request, Response} from 'express';
import MqDetailService from '../service/mqDetail.service';

const router = express.Router();
const service = new MqDetailService();

router.get("/", async (req: Request, res: Response) => {
    try {
        const _res = await service.list();
        res.status(200).json({data: _res});
    } catch (err) {
        res.status(400).json({data: err});
    }
});

export default router;