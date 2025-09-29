import UserService from "../services/user.service.js";
import BaseController from "./base.controller.js";

class UserController extends BaseController {
  constructor() {
    super();
    this.service = new UserService();
  }

  // Lấy danh sách users
  async getListUsers(req, res) {
    const { role } = req.query;
    const users = await this.service.getListUsers(role);
    res.json(users);
  }

  // Lấy user theo id
  async getUserById(req, res) {
    const { id } = req.params;
    const user = await this.service.getUserById(id);
    res.json(user);
  }

  // Tạo user mới
  async createUser(req, res) {
    const userData = req.body;
    await this.service.createUser(userData);
    res.status(201).json({ status: true, message: "User created" });
  }

  // Cập nhật user
  async updateUser(req, res) {
    const { id } = req.params;
    const userData = req.body;
    await this.service.updateUser(id, userData);
    res.json({ status: true, message: "User updated" });
  }

  // Xóa user
  async deleteUser(req, res) {
    const { id } = req.params;
    await this.service.deleteUser(id);
    res.json({ status: true, message: "User deleted" });
  }
}

export default UserController;
