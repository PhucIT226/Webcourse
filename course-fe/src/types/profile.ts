<<<<<<< HEAD
export interface UserInfo {
  id: number;
  name: string;
  email: string;
  roleId: number;
}
export interface Profile {
  id: number;
  userId: number;
  fullName?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string; // hoặc Date nếu cậu convert sang Date trong frontend
  user?: UserInfo; // include User khi gọi API
=======
export type Profile = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  dob?: string;
  address?: string;
  avatarUrl?: string;
  role?: {
    id: string;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

// Response từ API /profile/me
export interface ProfileResDto {
  status: boolean;
  message: string;
  data: Profile;
>>>>>>> main
}
