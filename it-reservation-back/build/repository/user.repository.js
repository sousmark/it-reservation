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
const db_helper_1 = __importDefault(require("../db.helper"));
const users_1 = require("../entity/users");
class UserRepository {
    constructor() {
        this.db = db_helper_1.default.getRepository(users_1.Users);
    }
    getSingleUser(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.findOneBy({
                id: _id,
            });
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.find();
        });
    }
    updateUser(_user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.update({
                id: _user.id,
            }, {
                ipn: _user.ipn,
                role_id: _user.role_id
            });
        });
    }
    deleteUser(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.delete({
                id: _id,
            });
        });
    }
}
exports.default = UserRepository;
