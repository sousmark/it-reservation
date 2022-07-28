"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ping_service_1 = __importDefault(require("../services/ping.service"));
const router = express_1.default.Router();
const pingService = new ping_service_1.default();
router.get("/", (req, res) => {
    res.send(pingService.getMessage());
});
exports.default = router;
