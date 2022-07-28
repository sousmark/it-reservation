interface PingResponse {
    message: string;
  }
  
  export default class PingService {
    public getPing() {
        return "pong";
    }
  }