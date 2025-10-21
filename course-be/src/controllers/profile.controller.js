import ProfileRepository from "../repositories/profile.repository.js";

class ProfileController {
  constructor() {
    this.repository = new ProfileRepository();

    // Bind để không bị mất context `this` khi truyền vào route
    this.getProfile = this.getProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  // [GET] /api/profile/me
  async getProfile(req, res) {
    try {
      const userId = req.user?.id; // Lấy từ middleware auth
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userProfile = await this.repository.getProfileByUserId(userId);

      if (!userProfile) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        success: true,
        data: userProfile,
      });
    } catch (error) {
      console.error("❌ Error getProfile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // [PATCH] /api/profile/me
  async updateProfile(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { name, phone, address, dob } = req.body;
      const avatar = req.file ? req.file.path : null; // nếu có upload avatar

      const updatedProfile = await this.repository.updateProfile(userId, {
        name,
        phone,
        address,
        dob,
        avatar,
      });

      res.json({
        success: true,
        message: "Profile updated successfully",
        data: updatedProfile,
      });
    } catch (error) {
      console.error("❌ Error updateProfile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new ProfileController;
