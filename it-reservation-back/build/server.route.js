"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ping_controller_1 = __importDefault(require("./controllers/ping.controller"));
const router = express_1.default.Router();
router.use("/ping", ping_controller_1.default);
// router.get("/ping", async (_req, res) => {
//   const controller = new PingController();
//   const response = await controller.getMessage();
//   return res.send(response);
// });
exports.default = router;
