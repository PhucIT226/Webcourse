import UserRepository from "../repositories/user.repository.js";

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  getListUsers(role) {
    return this.repository.getAllUsers(role);
  }

  getUserById(id, includeRefreshToken = false) {
    return this.repository.getUserById(id, includeRefreshToken);
  }

  createUser(userData) {
    return this.repository.createUser(userData);
  }

  updateUser(id, userData, updateRefreshToken = false) {
    return this.repository.updateUser(id, userData, updateRefreshToken);
  }

  deleteUser(id) {
    return this.repository.deleteUser(id);
  }

  getUserByEmail(email, withPassword = false) {
    return this.repository.getUserByEmail(email, withPassword);
  }
}

export default UserService;
