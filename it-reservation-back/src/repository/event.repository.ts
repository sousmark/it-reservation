import dbHelper from "../db.helper";
import { Event } from "../entity/event";

export default class EventRepository {
  
  db = dbHelper.getRepository(Event.name);

  public async getAllEvents() {
    return this.db.find();
  }

  public async postEvent(event: Event) {
    this.db.insert(event);
  }
}