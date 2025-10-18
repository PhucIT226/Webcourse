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
}
