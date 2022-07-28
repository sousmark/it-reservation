import { Process } from "../entity/process";
import ProcessRepository from "../repository/process.repository";

const repo = new ProcessRepository();

export default class ProcessService {

  public async find(id: number) {
    return await repo.getSingleProcess(id);
  }
  
  public async list() {
    return await repo.getAllProcess();
  }

  public async update(process: Process) {
    return await repo.updateProcess(process);
  }
}
