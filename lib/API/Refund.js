import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const CreatRefund = async (data) => {
  try {
    let result = await fetch(`${BaseUrl}/Refund/initiateRefund`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

export const GetAllrefunds = async () => {

  try {
    let result = await fetch(`${BaseUrl}/Refund/GetAll`, {
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

