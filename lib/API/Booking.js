import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";
import axios from "axios";

export const Createbooking = async (data) => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/Booking/createBooking`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        token: token,
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

export const Unsavedbooking = async (data) => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/Unsaved/saveUnsavedBooking`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        token: token,
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

export const CreateRazorpayorder = async (data) => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/Booking/Createorder`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        token: token,
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};



export const verifyPayment = async (paymentResult, bookingId) => {
  try {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      paymentResult;

    const response = await axios.post(`${BaseUrl}/Booking/verifyPayment`, {
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      bookingId,
    });

    console.log(response)
    return response.data;
  } catch (error) {
      console.error("Payment verification failed:", error);
    return error.message;
  }
};


export const Getbookingbyuserid = async (id) => {

  try {
    let result = await fetch(`${BaseUrl}/Booking/Getuserbooking/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};