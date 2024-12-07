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

export const Getbookingbyid = async (id) => {

  try {
    let result = await fetch(`${BaseUrl}/Booking/Getbookingbyid/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.log("result",result)
    return result;
  } catch (error) {
    console.log(error)
    return error.message;
  }
};


export const Getbookingbytheaterid = async (id) => {

  try {
    let result = await fetch(`${BaseUrl}/Booking/Getallbookingbytheater/${id}`, {
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

export const Getunsavedbookingbytheaterid = async (id) => {

  try {
    let result = await fetch(`${BaseUrl}/Unsaved/getAllUnsavedBookings/${id}`, {
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
export const Sendunsavedbookingmailbyid = async (id) => {

  try {
    let result = await fetch(`${BaseUrl}/Unsaved/send-unsavedbooking-email/${id}`, {
      method: "POST",
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

export const Sendbookingremainder = async (id) => {

  try {
    let result = await fetch(`${BaseUrl}/Booking//send-booking-email/${id}`, {
      method: "POST",
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


export const Deleteunsavedapi = async (id) => {
  try {
    let result = await fetch(`${BaseUrl}/Unsaved/deletebookingById/${id}`, {
      method: "DELETE",
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
