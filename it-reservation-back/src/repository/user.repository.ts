import dbHelper from "../db.helper";
import { Users } from "../entity/users";

export default class UserRepository {

  db = dbHelper.getRepository(Users);

  public async getSingleUser(_id: number) {
    return await this.db.findOneBy({
      id: _id,
    });
  }

  public async getAllUsers() {
   return await this.db.find();
  }

  public async updateUser(_user: Users) {
    return await this.db.update({
      id: _user.id,
    }, {
      ipn: _user.ipn,
      role_id: _user.role_id
    });
  }

  public async deleteUser(_id: number) {
    return await this.db.delete({
      id: _id,
    })
  }
}