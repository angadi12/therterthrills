import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const GetAllpayments = async ({ from, to, count, skip }) => {
  const params = new URLSearchParams();
  if (from) params.append("from", from); // Must be an integer
  if (to) params.append("to", to); // Must be an integer

  try {
    let result = await fetch(`${BaseUrl}/Payments/getAllpayments?${params.toString()}`, {
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


export const Getsinglepayments = async (id) => {
  try {
    let result = await fetch(`${BaseUrl}/Payments/payments/${id}`, {
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


