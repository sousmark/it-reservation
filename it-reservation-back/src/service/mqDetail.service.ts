import { NextFunction } from "express";
import MqDetailRepository from "../repository/mqDetail.repository"

const repo = new MqDetailRepository();

export default class MqDetailService {
  
  public async list() {
    return await repo.getAllMqDetail();
  }
}
