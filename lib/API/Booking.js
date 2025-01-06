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
    return result;
  } catch (error) {
    return error.message;
  }
};


// export const Getbookingbytheaterid = async (id, selectedTab) => {
//   try {
//     const params = new URLSearchParams({ status: selectedTab });
//     const url = `${BaseUrl}/Booking/Getallbookingbytheater/${id}?${params.toString()}`;

//     let result = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//       },
//     });
//     result = await result.json();
//     return result;
//   } catch (error) {
//     return error.message;
//   }
// };

// export const GetbookingbyBranchid = async (id, selectedTab) => {
//   try {
//     const params = new URLSearchParams({ status: selectedTab });
//     const url = `${BaseUrl}/Booking/getAllBookingByBranchId/${id}?${params.toString()}`;

//     let result = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//       },
//     });
//     result = await result.json();
//     return result;
//   } catch (error) {
//     return error.message;
//   }
// };

// export const Getbookingbytheaterid = async (id, selectedTab, startDate, endDate) => {
//   try {
//     const params = new URLSearchParams({
//       status: selectedTab,
//       startDate: startDate ,
//       endDate: endDate 
//     });
//     const url = `${BaseUrl}/Booking/Getallbookingbytheater/${id}?${params.toString()}`;

//     let result = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//       },
//     });
//     result = await result.json();
//     return result;
//   } catch (error) {
//     return error.message;
//   }
// };

// export const GetbookingbyBranchid = async (id, selectedTab, startDate, endDate) => {
//   try {
//     const params = new URLSearchParams({
//       status: selectedTab,
//       startDate: startDate ,
//       endDate: endDate 
//     });
//     const url = `${BaseUrl}/Booking/getAllBookingByBranchId/${id}?${params.toString()}`;

//     let result = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//       },
//     });
//     result = await result.json();
//     return result;
//   } catch (error) {
//     return error.message;
//   }
// };


export const Getbookingbytheaterid = async (id, selectedTab, startDate, endDate) => {
  try {
    const params = new URLSearchParams();
    if (selectedTab) params.append("status", selectedTab);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const url = `${BaseUrl}/Booking/Getallbookingbytheater/${id}?${params.toString()}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, message: error.message || "An error occurred" };
  }
};

export const GetbookingbyBranchid = async (id, selectedTab, startDate, endDate) => {
  try {
    const params = new URLSearchParams();
    if (selectedTab) params.append("status", selectedTab);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const url = `${BaseUrl}/Booking/getAllBookingByBranchId/${id}?${params.toString()}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, message: error.message || "An error occurred" };
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
    let result = await fetch(`${BaseUrl}/Booking/send-booking-email/${id}`, {
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


export const Requestforcancellation = async (id,data) => {
   const payload={
    reason:data
   }
  try {
    let result = await fetch(`${BaseUrl}/Booking/Rquest-for-cancellation/${id}`, {
      method: "POST",
      body:JSON.stringify(payload),
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