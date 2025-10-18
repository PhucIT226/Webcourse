import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCourse,
  getProfile,
  updateProfile,
} from "../services/profileService";
import type { Profile } from "../types/profile";
import type { TAny } from "../types/common";
import type { Course } from "../types/course";

interface ProfileState {
  profile: Profile | null;
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  courses: [],
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk<
  Profile,
  string,
  { rejectValue: string }
>("profile/getProfile", async (userId: string, { rejectWithValue }) => {
  try {
    const res: Profile = await getProfile(userId);
    return res;
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || "Fetch failed");
  }
});

export const editProfile = createAsyncThunk<
  Profile,
  { userId: string; data: Partial<Profile> },
  { rejectValue: string }
>("profile/editProfile", async ({ userId, data }, { rejectWithValue }) => {
  try {
    const res = await updateProfile(userId, data);
    return res;
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || "Update failed");
  }
});

export const fetchUserCourses = createAsyncThunk<
  Course[], // ✅ kiểu dữ liệu trả về
  string,
  { rejectValue: string }
>("profile/getCourses", async (userId: string, { rejectWithValue }) => {
  try {
    const res = await getCourse(userId);
    return res;
  } catch (err: TAny) {
    return rejectWithValue(
      err.response?.data?.message || "Fetch courses failed"
    );
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })
      .addCase(fetchUserCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchUserCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Lỗi tải khóa học";
      });
  },
});

export default profileSlice.reducer;
