import ServiceRepository from "../repository/service.repository";

const repo = new ServiceRepository();

export default class ServiceService {
  
  public async list() {
    return await repo.getAllServices();
  }
}
