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
}
