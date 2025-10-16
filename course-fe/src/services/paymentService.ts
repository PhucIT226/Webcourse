// src/services/paymentService.ts
import axios from "axios";

export const createPayment = async (payload: {
  courseId: string;
  userId: string;
  orderId?: string;
}) => {
  const res = await axios.post(
    "http://localhost:3000/api/v1/payments/create-payment-intent",
    payload,
    { withCredentials: true }
  );
  console.log("📨 Response from backend:", res.data);
  return res.data;
};
