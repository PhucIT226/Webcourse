import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { createPaymentIntent } from "../../../redux/paymentSlice";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAppDispatch, useAppSelector } from "../../../hooks";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface LocationState {
  courseId: string;
  courseTitle: string;
  coursePrice: number;
}

const CheckoutForm = ({ clientSecret, orderId }: any) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement)!;
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card },
      }
    );

    if (error) {
      alert(error.message);
    } else if (paymentIntent?.status === "succeeded") {
      alert("Thanh toán thành công!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        type="submit"
        className="mt-4 bg-green-500 px-6 py-2 text-white rounded-md"
      >
        Thanh toán
      </button>
    </form>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  console.log(location);
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.id);
  const { clientSecret, loading } = useAppSelector((state) => state.payment);
  const { courseId, courseTitle, coursePrice } =
    (location.state as LocationState) || {};
  useEffect(() => {
    if (courseId && userId) {
      dispatch(createPaymentIntent({ courseId, userId, orderId: "" }));
    }
  }, [courseId, userId, dispatch]);

  if (!courseId) {
    return <p>Không tìm thấy khóa học để thanh toán.</p>;
  }

  if (loading || !clientSecret) return <p>Đang tạo đơn thanh toán...</p>;

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">
        Thanh toán khóa học: {courseTitle}
      </h1>
      <p className="mb-6">
        Giá: {coursePrice ? `$${coursePrice}` : "Miễn phí"}
      </p>

      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm clientSecret={clientSecret} orderId="" />
      </Elements>
    </div>
  );
};

export default PaymentPage;
