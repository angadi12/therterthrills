import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const CreatRefund = async (data) => {
    const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/Refund/initiateRefund`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        token: token,
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

export const GetAllrefunds = async (id,startDate, endDate) => {

  try {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);


    let result = await fetch(`${BaseUrl}/Refund/GetAll/${id}?${params.toString()}`, {
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



export const Getrefunddetails = async (id) => {
 
  try {
    let result = await fetch(`${BaseUrl}/Refund/Getdetails/${id}`, {
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

