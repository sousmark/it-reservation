import express, {Request, Response} from 'express';
import EventService from '../service/event.service';

const router = express.Router();
const service = new EventService();

router.get("/", async (req: Request, res: Response) => {    
    try {
        const _res = await service.list();
        res.status(200).json(_res);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const event = {
            title: req.body.title,
            date: req.body.date,
            start: req.body.from,
            finish: req.body.to,
            description: req.body.description,
            creator: req.body.creator,
        };
        console.log(event);
        
        // const _res = await service.list();
        const _res = true;
        res.status(200).json(_res);
    } catch (err) {
        res.status(400).json(err);
    }
});

export default router;