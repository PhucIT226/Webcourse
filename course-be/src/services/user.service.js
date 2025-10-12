import UserRepository from "../repositories/user.repository.js";
import { hashPassword } from "../helpers/hash.helper.js";

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  // Lấy danh sách users
  getListUsers({ page, pageSize, role, search, sortField, sortOrder }) {
    return this.repository.getAllUsers({ page, pageSize, role, search, sortField, sortOrder });
  }

  // Lấy user theo id
  getUserById(id, includeRefreshToken = false) {
    return this.repository.getUserById(id, includeRefreshToken);
  }

  // Tạo user mới (hash password trước khi lưu)
  async createUser(userData) {
    if (userData.password) {
      userData.passwordHash = await hashPassword(userData.password);
      delete userData.password; // tránh lưu plaintext
    }
    return this.repository.createUser(userData);
  }

  // Cập nhật user
  async updateUser(id, userData, updateRefreshToken = false) {
    if (userData.password) {
      userData.passwordHash = await hashPassword(userData.password);
      delete userData.password;
    }
    return this.repository.updateUser(id, userData, updateRefreshToken);
  }

  // Xóa user
  deleteUser(id) {
    return this.repository.deleteUser(id);
  }

  // Lấy user theo email
  getUserByEmail(email, withPassword = false) {
    return this.repository.getUserByEmail(email, withPassword);
  }
}

export default UserService;
