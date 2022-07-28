import express, {Request, Response} from 'express';
import cors from 'cors';
import route from './server.router';
import config from 'dotenv';
const jwt = require('jsonwebtoken');
import bodyParser from 'body-parser';
import TokenService from './service/token.service';

const app = express();
const port = process.env.PORT || 3000;
const routes = route;//DB burada çağırılıyor
const tokenHelper = new TokenService();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

try {
  app.use(async function (req, res, next) {
    if (req.url != '/api/login') {      
      jwt.verify(req.headers.token, "supersecret", (err: any, decoded: any) => {
        if (err) {
          res.status(401).json('Unauthorized');
        }
        else {
          next();
        }
      });
    } else {
      next();
    }
  });
  app.use("/api", routes);
} catch (err) {
  console.log("Hata: ", err);
}


app.get("/", (req: Request, res: Response) => {
  res.send("It-Reservation-API")
});

app.listen(port, () => {
  return console.log(`it-reservation-api is listening at http://localhost:${port}`);
}).maxConnections = 100;

export default app;