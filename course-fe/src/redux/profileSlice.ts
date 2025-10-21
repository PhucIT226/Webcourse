// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getCourse, getProfile, updateProfile } from "../services/profileService";
// import type { Profile } from "../types/profile";
// import type { TAny } from "../types/common";
// import type { Course } from "../types/course";

// // 🧩 Kiểu dữ liệu cho state
// interface ProfileState {
//   profile: Profile | null;
//   courses: Course[];
//   loading: boolean;
//   error: string | null;
// }

// // 🎯 State khởi tạo
// const initialState: ProfileState = {
//   profile: null,
//   courses: [],
//   loading: false,
//   error: null,
// };

// // 📥 Lấy thông tin profile theo userId
// export const fetchProfile = createAsyncThunk<
//   Profile,
//   string,
//   { rejectValue: string }
// >("profile/fetchProfile", async (userId, { rejectWithValue }) => {
//   try {
//     const res: Profile = await getProfile(userId);
//     return res;
//   } catch (err: TAny) {
//     return rejectWithValue(err.response?.data?.message || "Không thể tải profile");
//   }
// });

// // ✏️ Cập nhật profile
// export const editProfile = createAsyncThunk<
//   Profile,
//   { userId: string; data: Partial<Profile> },
//   { rejectValue: string }
// >("profile/editProfile", async ({ userId, data }, { rejectWithValue }) => {
//   try {
//     const res: Profile = await updateProfile(userId, data);
//     return res;
//   } catch (err: TAny) {
//     return rejectWithValue(err.response?.data?.message || "Không thể cập nhật profile");
//   }
// });

// // 📚 Lấy danh sách khóa học của user
// export const fetchUserCourses = createAsyncThunk<
//   Course[],
//   string,
//   { rejectValue: string }
// >("profile/fetchUserCourses", async (userId, { rejectWithValue }) => {
//   try {
//     const res: Course[] = await getCourse(userId);
//     return res;
//   } catch (err: TAny) {
//     return rejectWithValue(err.response?.data?.message || "Không thể tải khóa học");
//   }
// });

// // 🧠 Slice
// const profileSlice = createSlice({
//   name: "profile",
//   initialState,
//   reducers: {
//     clearProfile: (state) => {
//       state.profile = null;
//       state.courses = [];
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch profile
//       .addCase(fetchProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.profile = action.payload;
//       })
//       .addCase(fetchProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload ?? "Lỗi tải profile";
//       })

//       // Edit profile
//       .addCase(editProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(editProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.profile = action.payload;
//       })
//       .addCase(editProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload ?? "Lỗi cập nhật profile";
//       })

//       // Fetch user courses
//       .addCase(fetchUserCourses.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserCourses.fulfilled, (state, action) => {
//         state.loading = false;
//         state.courses = action.payload;
//       })
//       .addCase(fetchUserCourses.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload ?? "Lỗi tải khóa học";
//       });
//   },
// });

// export const { clearProfile } = profileSlice.actions;
// export default profileSlice.reducer;
