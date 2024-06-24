import { useNavigate, useSearchParams } from "react-router-dom";
import "./Verify.scss";
import axiosInstance from "../../utils/axiosInstance";
import { useCallback, useEffect } from "react";

function Verify() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const verifyPayment = useCallback(async () => {
    try {
      const response = await axiosInstance.post("/api/order/verify", {
        success,
        orderId,
      });
      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }, [success, orderId, navigate]);

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]);

  return (
    <div className="verify">
      <div className="spinner"></div>
      {success} and {orderId}
    </div>
  );
}

export default Verify;
