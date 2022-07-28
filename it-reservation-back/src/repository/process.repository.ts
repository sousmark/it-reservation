import dbHelper from "../db.helper";
import { Process } from "../entity/process";

export default class ProcessRepository {

  db = dbHelper.getRepository(Process);

  public async getSingleProcess(_id: number) {
    return await this.db.findOneBy({
      id: _id,
    });
  }

  public async getAllProcess() {
   return await this.db.find();
  }

  public async updateProcess(_process: Process) {
    // let processToUpdate = await this.db.findOneBy({
    //   id: _process.id,
    // });
    
    return await this.db.update({
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
  }

  public async deleteProcess(_id: number) {
    return await this.db.delete({
      id: _id,
    })
  }
}