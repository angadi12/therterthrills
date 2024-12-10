import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const GetAllCoupon = async () => {
  try {
    let result = await fetch(`${BaseUrl}/Coupon/GetAllCoupons`, {
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







export const CreateCouponapi = async (data) => {
  try {
    let result = await fetch(`${BaseUrl}/Coupon/CreateCoupon`, {
      method: "POST",
      body: JSON.stringify(data),
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


export const ApplyCouponapi = async (data) => {
  try {
    let result = await fetch(`${BaseUrl}/Coupon/ApplyCoupon`, {
      method: "POST",
      body: JSON.stringify(data),
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


export const UpadteCouponapi = async (data,id) => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/Coupon/UpdateCoupon/${id}`, {
      method: "PUT",
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

export const DeleteCouponapi = async (id) => {
  try {
    let result = await fetch(`${BaseUrl}/Coupon/DeleteCoupon/${id}`, {
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




