const { Client } = require("ldapts");

const url = "ldap://10.237.139.93:389";

export default class LoginService {
  public async authenticate(ipn: string, password: string) {
    
    const client = new Client({
      url,
    });

    let isAuthenticated;
    try {
      await client.bind("CORP" + "\\" + ipn, password);

      isAuthenticated = true;
    } catch (ex) {
      isAuthenticated = false;
    } finally {
      await client.unbind();
    }
    return isAuthenticated;
  }
}
