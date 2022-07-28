"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ping_controller_1 = __importDefault(require("../controllers/ping.controller"));
const router = express_1.default.Router();
const pingCtrl = new ping_controller_1.default();
// router.route("/")
//     .get(pingCtrl.get);
// router.route("/")
router.get("/", (req, res) => {
    res.send(pingCtrl.getMessage());
});
exports.default = router;
