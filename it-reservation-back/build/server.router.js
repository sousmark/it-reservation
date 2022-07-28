"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ping_controller_1 = __importDefault(require("./controller/ping.controller"));
const mqDetail_controller_1 = __importDefault(require("./controller/mqDetail.controller"));
const process_controller_1 = __importDefault(require("./controller/process.controller"));
const user_controller_1 = __importDefault(require("./controller/user.controller"));
const login_controller_1 = __importDefault(require("./controller/login.controller"));
const router = express_1.default.Router();
router.use("/login", login_controller_1.default);
router.use("/ping", ping_controller_1.default);
router.use("/mq", mqDetail_controller_1.default);
router.use("/process", process_controller_1.default);
router.use("/user", user_controller_1.default);
exports.default = router;
