import { Users } from "../entity/users";
import UserRepository from "../repository/user.repository";

const repo = new UserRepository();

export default class UserService {

  public async find(id: number) {
    return await repo.getSingleUser(id);
  }
  
  public async list() {
    return await repo.getAllUsers();
  }

  public async update(user: Users) {
    return await repo.updateUser(user);
  }

  public async delete(id: number) {
    return await repo.deleteUser(id);
  }
}
