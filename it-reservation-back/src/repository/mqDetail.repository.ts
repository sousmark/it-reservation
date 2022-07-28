import dbHelper from "../db.helper";
import { MqDetail } from "../entity/mqDetail";

export default class MqDetailRepository {
  
  db = dbHelper.getRepository(MqDetail);

  public async getAllMqDetail() {
    return await this.db.find();
  }
}