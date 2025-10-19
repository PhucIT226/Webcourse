<<<<<<< HEAD
import type { TAny } from "../types/common";
import axios from "./axiosClient";

export const getProfile = async (userId: string) => {
  const response = await axios.get(`/profiles/${userId}`);
  return response.data;
};
export const updateProfile = async (userId: string, data: TAny) => {
  const response = await axios.put(`/profiles/${userId}`, data);
  return response.data;
};
export const getCourse = async (userId: string) => {
  const response = await axios.get(`/profiles/${userId}`);
  return response.data;
};
=======
import axios from "./axiosClient";
import type { Profile, ProfileResDto } from "../types/profile";

const ProfileService = {
  async getProfile(): Promise<Profile> {
    const res = await axios.get<ProfileResDto>("/profile/me");
    return res.data.data;
  },

  async updateProfile(profile: Partial<Profile>, file?: File): Promise<Profile> {
    const formData = new FormData();
    Object.entries(profile).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    if (file) formData.append("avatar", file);

    const res = await axios.patch<ProfileResDto>("/profile/me", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.data;
  },
};

export default ProfileService;
>>>>>>> main
