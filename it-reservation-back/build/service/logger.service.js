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
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../entity/response");
class LoggerService {
    constructor() {
        this.response = new response_1.LightResponse;
    }
    create(_success, _data, _message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.response.success = _success;
            this.response.data = _data;
            this.response.message = _message;
            return yield this.response;
        });
    }
}
exports.default = LoggerService;
