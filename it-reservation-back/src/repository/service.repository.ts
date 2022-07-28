import dbHelper from "../db.helper";
import { Service } from "../entity/service";

export default class ServiceRepository {
  
  db = dbHelper.getRepository(Service.name);

  public async getAllServices() {    
    return this.db.find();
  }
}