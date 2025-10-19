import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
<<<<<<< HEAD
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
=======
import type { PayloadAction } from "@reduxjs/toolkit";
import ProfileService from "../services/profileService";
import type { Profile } from "../types/profile";

type ProfileState = {
  data: Profile | null;
  loading: boolean;
  error: string | null;
};

const initialState: ProfileState = {
  data: null,
>>>>>>> main
  loading: false,
  error: null,
};

<<<<<<< HEAD
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
=======
export const fetchProfile = createAsyncThunk<Profile>(
  "profile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await ProfileService.getProfile();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateProfile = createAsyncThunk<
  Profile,
  { profile: Partial<Profile>; file?: File }
>("profile/update", async ({ profile, file }, { rejectWithValue }) => {
  try {
    return await ProfileService.updateProfile(profile, file);
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
>>>>>>> main
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
<<<<<<< HEAD
  reducers: {},
=======
  reducers: {
    clearProfile: (state) => {
      state.data = null;
      state.error = null;
    },
  },
>>>>>>> main
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
<<<<<<< HEAD
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
=======
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
>>>>>>> main
      });
  },
});

<<<<<<< HEAD
=======
export const { clearProfile } = profileSlice.actions;
>>>>>>> main
export default profileSlice.reducer;
