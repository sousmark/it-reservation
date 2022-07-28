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
const mqDetail_service_1 = __importDefault(require("../service/mqDetail.service"));
const router = express_1.default.Router();
const service = new mqDetail_service_1.default();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _res = yield service.list();
        res.status(200).json({ data: _res });
    }
    catch (err) {
        res.status(400).json({ data: err });
    }
}));
exports.default = router;
