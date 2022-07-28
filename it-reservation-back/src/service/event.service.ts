import EventRepository from "../repository/event.repository";

const repo = new EventRepository();

export default class EventService {
  
  public async list() {
    return await repo.getAllEvents();
  }
}
