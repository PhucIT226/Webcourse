import type { TAny } from "../types/common";
import axios from "./axiosClient";

interface CreatePaymentIntentPayload {
  courseId: string;
  orderId: string;
}

interface CreatePaymentIntentResponse {
  clientSecret: string;
  [key: string]: TAny;
}

export const createPayment = async (
  payload: CreatePaymentIntentPayload
): Promise<CreatePaymentIntentResponse> => {
  try {
    // axios trả về response.data đã là object JSON
    const { data } = await axios.post<CreatePaymentIntentResponse>(
      "payments/create-payment-intent",
      payload // axios tự stringify
    );

    return data;
  } catch (error: TAny) {
    // Axios lỗi thường có response.data.message
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Failed to create payment intent";
    throw new Error(message);
  }
};
