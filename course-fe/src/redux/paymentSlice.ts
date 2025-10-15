import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { TAny } from "../types/common";
import { createPayment } from "../services/paymentService";

interface PaymentState {
  clientSecret: string | null;
  loading: boolean;
  error: string | null;
}

interface PaymentPayload {
  courseId: string;
  userId: string;
  orderId: string; // Added orderId to match CreatePaymentIntentPayload
}

const initialState: PaymentState = {
  clientSecret: null,
  loading: false,
  error: null,
};

export const createPaymentIntent = createAsyncThunk<
  { clientSecret: string; orderId: string },
  PaymentPayload,
  { rejectValue: string }
>("payment/createPaymentIntent", async (payload, { rejectWithValue }) => {
  try {
    const data = await createPayment(payload);
    return {
      clientSecret: data.clientSecret,
      orderId: data.orderId,
    };
  } catch (err: any) {
    return rejectWithValue(err?.message || "Something went wrong");
  }
});

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createPaymentIntent.fulfilled,
        (
          state,
          action: PayloadAction<{ clientSecret: string; orderId: string }>
        ) => {
          state.loading = false;
          state.clientSecret = action.payload.clientSecret;
          state.orderId = action.payload.orderId;
        }
      )
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});
export default paymentSlice.reducer;
