import db from "../database/models/index.js";
import { v4 as uuidv4 } from "uuid";
import { getExpiresAtFromToken } from "../helpers/jwt.helper.js";

class UserRepository {
  constructor() {
    this.model = db.User;
  }

  async getAllUsers(role) {
    if (role) {
      return await this.model.findAll({
        include: [{ model: db.Role, as: "role", where: { name: role } }],
      });
    }
    return await this.model.findAll({
      include: [{ model: db.Role, as: "role" }],
    });
  }

  async getUserById(id, includeRefreshToken = false) {
    const include = [{ model: db.Role, as: "role" }];
    if (includeRefreshToken) include.push(db.RefreshToken);

    return this.model.findByPk(id, { include });
  }

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

  async updateUser(id, data, updateRefreshToken = false) {
    const { refreshToken, passwordHash, ...rest } = data;
    const user = await this.getUserById(id, updateRefreshToken);
    if (!user) throw new Error("User not found");

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

  async deleteUser(id) {
    const user = await this.getUserById(id);
    if (!user) throw new Error("User not found");
    await user.destroy();
    return true;
  }

  async getUserByEmail(email, withPassword = false) {
    return withPassword
      ? this.model.scope("withPassword").findOne({ where: { email } })
      : this.model.findOne({ where: { email } });
  }

  async _updateOrCreateRefreshToken(user, token) {
    const expiresAt = getExpiresAtFromToken(token);
    if (user.RefreshToken) {
      await user.RefreshToken.update({ token, expiresAt });
    } else {
      await user.createRefreshToken({ token, expiresAt });
    }
  }
}

export default UserRepository;
