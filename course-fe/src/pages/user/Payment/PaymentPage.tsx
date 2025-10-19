import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { createPaymentIntent } from "../../../redux/paymentSlice";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ========================== Checkout Form ==========================
const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
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
      alert("🎉 Thanh toán thành công!");
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border p-3 rounded-md">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold transition"
      >
        {loading ? "Đang xử lý..." : "Thanh toán ngay"}
      </button>
    </form>
  );
};

// ========================== Main Payment Page ==========================
const PaymentPage = () => {
  const location = useLocation();
  console.log(location);
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.id);
  const { clientSecret, loading } = useAppSelector((state) => state.payment);

  const { courseId, courseTitle, coursePrice } = location.state || {};

  useEffect(() => {
    if (courseId && userId) {
      dispatch(createPaymentIntent({ courseId, userId }));
    }
  }, [courseId, userId, dispatch]);

  if (loading || !clientSecret) return <p>Đang tạo đơn thanh toán...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* ===== Left: Billing & Card Info ===== */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        <p className="text-sm text-gray-500 mb-6">
          Udemy is required by law to collect applicable transaction taxes for
          purchases made in certain tax jurisdictions.
        </p>

        {/* Card payment */}
        <h3 className="font-semibold mb-3">Payment method</h3>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      </div>

      {/* ===== Right: Order summary ===== */}
      <div className="border rounded-md p-6 bg-gray-50">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <p className="flex justify-between mb-2">
          <span>Course:</span>
          <span className="font-semibold">{courseTitle}</span>
        </p>
        <p className="flex justify-between mb-2">
          <span>Price:</span>
          <span className="font-semibold">${coursePrice}</span>
        </p>
        <hr className="my-4" />
        <p className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>${coursePrice}</span>
        </p>

        <div className="mt-6 text-sm text-gray-600">
          <p className="font-semibold mb-1">30-Day Money-Back Guarantee 💸</p>
          <p>
            Not satisfied? Get a full refund within 30 days. Simple and
            straightforward!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
