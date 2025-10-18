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
