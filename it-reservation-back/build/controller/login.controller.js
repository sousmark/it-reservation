"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_service_1 = __importDefault(require("../service/logger.service"));
const login_service_1 = __importDefault(require("../service/login.service"));
const token_service_1 = __importDefault(require("../service/token.service"));
const router = express_1.default.Router();
const service = new login_service_1.default();
const logger = new logger_service_1.default();
const tokenHelper = new token_service_1.default();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ipn = req.body.ipn;
        const password = req.body.password;
        const _res = yield service.authenticate(ipn, password);
        console.log('Login: ', _res);
        if (_res) {
            var token = yield tokenHelper.createCode(ipn);
            res.status(200).json(yield logger.create(1, token, "Login Success"));
        }
        else {
            res.status(404).json(yield logger.create(0, _res, "Login Failed"));
        }
    }
    catch (err) {
        res.status(400).json(yield logger.create(0, { err }, "Bad Request"));
    }
}));
exports.default = router;
