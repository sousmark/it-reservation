import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class TokenService {
  
  public async createCode(ipn: string) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 5; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    var hashCode = bcrypt.hashSync(result, 8);
    var token = jwt.sign({id: ipn, code: hashCode}, 'supersecret', {
      expiresIn: 5*60
    })
    return token;
  }

  public async verifyToken(token: any, ipn: any) {
    if(!token) {
      return false;
    } else {
      jwt.verify(token, 'supersecret'), function(err: any, decoded: any) {
        if(ipn = decoded.id) {
          return true;
        } else {
          return false;
        }
      }
    }
  }


}