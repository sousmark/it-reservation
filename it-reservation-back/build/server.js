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
const cors_1 = __importDefault(require("cors"));
const server_router_1 = __importDefault(require("./server.router"));
const body_parser_1 = __importDefault(require("body-parser"));
const token_service_1 = __importDefault(require("./service/token.service"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const routes = server_router_1.default; //DB burada çağırılıyor
const tokenHelper = new token_service_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
try {
    app.use(function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.url);
            if (req.url != '/api/login') {
                if (yield tokenHelper.verifyToken(req.query.token, req.query.user)) {
                    next();
                }
                else {
                    res.status(400).json('Bad Request');
                }
            }
            else {
                next();
            }
        });
    });
    app.use("/api", routes);
}
catch (err) {
    console.log("Hata: ", err);
}
app.get("/", (req, res) => {
    res.send("It-Reservation-API");
});
app.listen(port, () => {
    return console.log(`light-api is listening at http://localhost:${port}`);
}).maxConnections = 100;
exports.default = app;
