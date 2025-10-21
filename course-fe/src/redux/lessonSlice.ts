import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import LessonService from "../services/lessonService";
import type { TAny } from "../types/common";
import type {
  Lesson,
  LessonResDto,
  GetAllLessonParams,
} from "../types/lesson";

type LessonState = {
  data: Lesson[];
  pagination: LessonResDto["pagination"] | null;
  loading: boolean;
  error: string | null;
};

const initialState: LessonState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

// Thunks
export const fetchLessons = createAsyncThunk<
  LessonResDto,
  GetAllLessonParams | undefined,
  { rejectValue: string }
>("lessons/fetchAll", async (params, { rejectWithValue }) => {
  try {
    return await LessonService.getAll(params);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchLessonById = createAsyncThunk<
  Lesson,
  string,
  { rejectValue: string }
>("lessons/fetchById", async (id, { rejectWithValue }) => {
  try {
    return await LessonService.getById(id);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const createLesson = createAsyncThunk<
  Lesson,
  Partial<Lesson>,
  { rejectValue: string }
>("lessons/create", async (lesson, { rejectWithValue }) => {
  try {
    return await LessonService.create(lesson);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateLesson = createAsyncThunk<
  Lesson,
  { id: string; lesson: Partial<Lesson> },
  { rejectValue: string }
>("lessons/update", async ({ id, lesson }, { rejectWithValue }) => {
  try {
    return await LessonService.update(id, lesson);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deleteLesson = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("lessons/delete", async (id, { rejectWithValue }) => {
  try {
    await LessonService.delete(id);
    return id;
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Slice
const lessonSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    clearLessons: (state) => {
      state.data = [];
      state.pagination = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchLessons.fulfilled,
        (state, action: PayloadAction<LessonResDto>) => {
          state.loading = false;
          state.data = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        fetchLessonById.fulfilled,
        (state, action: PayloadAction<Lesson>) => {
          const existing = state.data.find((l) => l.id === action.payload.id);
          if (!existing) state.data.push(action.payload);
        }
      )
      .addCase(
        createLesson.fulfilled,
        (state, action: PayloadAction<Lesson>) => {
          state.data.push(action.payload);
        }
      )
      .addCase(
        updateLesson.fulfilled,
        (state, action: PayloadAction<Lesson>) => {
          const index = state.data.findIndex((l) => l.id === action.payload.id);
          if (index !== -1) state.data[index] = action.payload;
        }
      )
      .addCase(
        deleteLesson.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.data = state.data.filter((l) => l.id !== action.payload);
        }
      );
  },
});

export const { clearLessons } = lessonSlice.actions;
export default lessonSlice.reducer;
