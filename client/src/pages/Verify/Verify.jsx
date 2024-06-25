import { useNavigate, useSearchParams } from "react-router-dom";
import "./Verify.scss";
// import axiosInstance from "../../utils/axiosInstance";
// import { useCallback, useEffect } from "react";

function Verify() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  // const verifyPayment = useCallback(async () => {
  //   try {
  //     const response = await axiosInstance.post("/api/order/verify", {
  //       success,
  //       orderId,
  //     });
  //     if (response.data.success) {
  //       console.log(response.data.message);
  //     } else {
  //       console.log(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [success, orderId]);

  // useEffect(() => {
  //   verifyPayment();
  // }, [verifyPayment]);

  const handleOnClick = () => {
    if (success === "true") {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="verify">
      {/* <div className="spinner"></div> */}
      <div className="wrapper">
        <p>
          Your order <b>{orderId}</b> has been{" "}
          {success === "true" ? "successfully placed" : "canceled"}.
        </p>
        <button onClick={handleOnClick}>
          {success === "true" ? "Track your order here" : "Place a new order"}
        </button>
      </div>
    </div>
  );
}

export default Verify;
