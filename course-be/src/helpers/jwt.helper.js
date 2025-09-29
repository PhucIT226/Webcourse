import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt.config.js";

/**
 * Tạo access token
 */
export const generateAccessToken = (userId) => {
  return jwt.sign({ sub: userId }, jwtConfig.JWT_SECRET, {
    expiresIn: jwtConfig.JWT_EXPIRES_IN,
  });
};

/**
 * Tạo refresh token và lưu vào DB
 */
export const generateRefreshToken = async (userId) => {
  const refreshToken = jwt.sign({ sub: userId }, jwtConfig.JWT_REFRESH_SECRET, {
    expiresIn: jwtConfig.JWT_REFRESH_EXPIRES_IN,
  });
  await userService.updateUser(userId, { refreshToken }, true);
  return refreshToken;
};

/**
 * Tạo cả 2 token, trả về object { accessToken, refreshToken }
 * @param {string} userId
 * @param {boolean} accessTokenOnly nếu true chỉ trả accessToken
 */
export const generateTokens = async (userId, accessTokenOnly = false) => {
  const accessToken = generateAccessToken(userId);
  if (accessTokenOnly) return { accessToken };

  const refreshToken = await generateRefreshToken(userId);
  return { accessToken, refreshToken };
};

/**
 * Verify token
 * @param {string} token
 * @param {"access"|"refresh"} type
 * @returns payload nếu hợp lệ, null nếu không
 */
export const verifyToken = (token, type = "access") => {
  try {
    const secret =
      type === "refresh" ? jwtConfig.JWT_REFRESH_SECRET : jwtConfig.JWT_SECRET;
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

/**
 * Lấy expiresAt từ token (Date object)
 * @param {string} token
 * @returns {Date|null}
 */
export const getExpiresAtFromToken = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded?.exp) return null;
    return new Date(decoded.exp * 1000);
  } catch {
    return null;
  }
};

/**
 * Set token vào cookie
 * @param {object} res - express response
 * @param {string} accessToken
 * @param {string} refreshToken
 */
export const setTokensAsCookies = (res, accessToken, refreshToken) => {
  if (accessToken) {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: false, // production: true
      expires: getExpiresAtFromToken(accessToken),
    });
  }

  if (refreshToken) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: false, // production: true
      expires: getExpiresAtFromToken(refreshToken),
    });
  }
};
