import express, {Request, Response} from 'express';
import { LightResponse } from '../entity/response';
import LoggerService from '../service/logger.service';
import ProcessService from '../service/process.service';

const router = express.Router();
const service = new ProcessService();
const logger = new LoggerService();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const _res = await service.find(parseInt(req.params.id));
    if(_res) {
      res.status(200).json(await logger.create(1, _res!, "Success"));
    } else {
      res.status(404).json(await logger.create(0, _res!, "Not Found"));
    }
  } catch (err) {
    res.status(400).json(await logger.create(0, {err}, "Bad Request"));
  }
})

router.get("/", async (req: Request, res: Response) => {
  try {
    const _res = await service.list();
    res.status(200).json({data: _res});
  } catch (err) {
    res.status(400).json({data: err});
  }
});

router.put("/", async (req: Request, res: Response) => {
  try {
    const _res = await service.update(req.body);
    res.status(200).json({data: _res});
  } catch (err) {
    res.status(400).json({data: err});
  }
});

export default router;