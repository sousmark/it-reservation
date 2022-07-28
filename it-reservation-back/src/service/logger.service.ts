import { LightResponse } from "../entity/response";

export default class LoggerService {
  response = new LightResponse;
  public async create(_success: number, _data: Object, _message: string) {
    this.response.success = _success;
    this.response.data = _data;
    this.response.message = _message;

    return await this.response;
  }
}