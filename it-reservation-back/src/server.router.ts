import express from "express";
import pingCrtl from './controller/ping.controller';
import mqDetailCtrl from './controller/mqDetail.controller'
import processCtrl from './controller/process.controller'
import userCtrl from './controller/user.controller'
import loginCtrl from './controller/login.controller'
import eventCtrl from './controller/event.controller'
import serviceCtrl from './controller/service.controller'

const router = express.Router();

router.use("/login", loginCtrl);
router.use("/ping", pingCrtl);
router.use("/mq", mqDetailCtrl);
router.use("/process", processCtrl);
router.use("/user", userCtrl);
router.use('/event', eventCtrl);
router.use('/service', serviceCtrl);

export default router;