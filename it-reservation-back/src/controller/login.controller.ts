import express, { Request, Response } from "express";
import http from "http";

import LoggerService from "../service/logger.service";
import LoginService from "../service/login.service";
import TokenService from "../service/token.service";

const router = express.Router();
const service = new LoginService();
const logger = new LoggerService();
const tokenHelper = new TokenService();

router.post("/", async (req: Request, res: Response) => {
  try {
    const ipn = req.body.ipn;
    const password = req.body.password;
    const _res = await service.authenticate(ipn, password);
    console.log("Login: ", _res);
    //LDAP auth control
    if (_res) {
      var url = "http://oyaapp01.oyak.bur.renault.tr/humanist/api/employees?ipn="+ipn;
      http
        .get(url, (result: any) => {
          let body = "";

          result.on("data", (chunk: any) => {
            body += chunk;
          });

          result.on("end", async () => {
            try {
              let json = JSON.parse(body);
              var userDb = json.employees;

              // Is the user present in the db check
              if (userDb !== null) {
                var token = await tokenHelper.createCode(ipn);
                res.status(200).json(await logger.create(1, { token: token, user: userDb[0] }, "Login Success"));
              } else {
                res.status(404).json(await logger.create(0, { ipn, password }, "User Not Found Please Contact To Administrator."));
              }
            } catch (error: any) {
              res.status(404).json(await logger.create(0, { ipn, password }, "User Not Found Please Contact To Administrator."));
            }
          });
        })
        .on("error", (error: any) => {
          console.error(error.message);
        });
    }
    //LDAP auth control
    else {
      res.status(404).json(await logger.create(0, _res!, "Login Failed"));
    }
  } catch (err) {
    res.status(400).json(await logger.create(0, { err }, "Bad Request"));
  }
});

export default router;
