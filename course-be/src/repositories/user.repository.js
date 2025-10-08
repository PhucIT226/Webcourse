import db from "../database/models/index.js";
import { v4 as uuidv4 } from "uuid";
import { getExpiresAtFromToken } from "../helpers/jwt.helper.js";
import { Op } from "sequelize";

class UserRepository {
  constructor() {
    this.model = db.User;
  }

  // Lấy danh sách users (có phân trang, search, filter role)
  async getAllUsers({ page = 1, limit = 10, role, search }) {
    const where = {};
    const include = [{ model: db.Role, as: "role" }];

    if (role) {
      include[0].where = { name: role };
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows } = await this.model.findAndCountAll({
      where,
      include,
      offset: (page - 1) * limit,
      limit: +limit,
      order: [["createdAt", "DESC"]],
    });

    return {
      data: rows,
      pagination: {
        total: count,
        page: +page,
        limit: +limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  // Lấy user theo id
  async getUserById(id, includeRefreshToken = false) {
    const include = [{ model: db.Role, as: "role" }];
    if (includeRefreshToken)
      include.push({ model: db.RefreshToken, as: "refreshToken" });

    return this.model.findByPk(id, { include });
  }

  // Tạo user
  async createUser(userData) {
    return this.model.create({
      id: uuidv4(),
      name: userData.name,
      email: userData.email,
      passwordHash: userData.passwordHash,
      roleId: userData.roleId || null,
      avatarUrl: userData.avatarUrl || null,
    });
  }

  // Cập nhật user
  async updateUser(id, data, updateRefreshToken = false) {
    const { refreshToken, passwordHash, ...rest } = data;
    const user = await this.getUserById(id, updateRefreshToken);
    if (!user) return null;

    // Update refresh token nếu có
    if (updateRefreshToken && refreshToken) {
      await this._updateOrCreateRefreshToken(user, refreshToken);
    }

    // Update thông tin cơ bản
    const updateData = {
      ...rest,
      ...(passwordHash ? { passwordHash } : {}),
    };

    await user.update(updateData);
    return user;
  }

  // Xóa user (có thể đổi thành soft delete sau này)
  async deleteUser(id) {
    const user = await this.getUserById(id);
    if (!user) return false;

    await user.destroy();
    return true;
  }

  // Lấy user theo email
  async getUserByEmail(email, withPassword = false) {
    return withPassword
      ? this.model.scope("withPassword").findOne({ where: { email } })
      : this.model.findOne({ where: { email } });
  }

  // Update hoặc tạo refresh token mới
  async _updateOrCreateRefreshToken(user, token) {
    const expiresAt = getExpiresAtFromToken(token);

    if (user.refreshToken) {
      await user.refreshToken.update({ token, expiresAt });
    } else {
      await user.createRefreshToken({ token, expiresAt });
    }
  }
}

export default UserRepository;
