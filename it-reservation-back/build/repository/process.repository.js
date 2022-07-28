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
const process_1 = require("../entity/process");
class ProcessRepository {
    constructor() {
        this.db = db_helper_1.default.getRepository(process_1.Process);
    }
    getSingleProcess(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.findOneBy({
                id: _id,
            });
        });
    }
    getAllProcess() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.find();
        });
    }
    updateProcess(_process) {
        return __awaiter(this, void 0, void 0, function* () {
            // let processToUpdate = await this.db.findOneBy({
            //   id: _process.id,
            // });
            return yield this.db.update({
                id: _process.id,
            }, {
                status_id: _process.status_id,
                bl_number: _process.bl_number,
                transport_identifier: _process.transport_identifier,
                reference_count: _process.reference_count,
                package_count: _process.package_count,
                gross_weight: _process.gross_weight,
                seller_info: _process.seller_info,
                create_date: _process.create_date,
                update_date: _process.update_date,
                update_user: _process.update_user,
                unloading_time: _process.unloading_time,
                unloading_user: _process.unloading_user,
                loading_time: _process.loading_time,
                loading_user: _process.loading_user,
                vehicle_plate: _process.vehicle_plate,
                is_damaged: _process.is_damaged
            });
            // return processToUpdate;
        });
    }
    deleteProcess(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.delete({
                id: _id,
            });
        });
    }
}
exports.default = ProcessRepository;
