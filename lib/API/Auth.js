import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const Createuser = async (data) => {
  try {
    let result = await fetch(`${BaseUrl}/users/user/create`, {
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


export const Sendotp = async (data) => {
  try {
    let result = await fetch(`${BaseUrl}/Auth/send-otp`, {
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

export const Verifyotp = async (data) => {

  try {
    let result = await fetch(`${BaseUrl}/Auth/verify-otp`, {
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


export const Getuserbyid = async (id) => {

  try {
    let result = await fetch(`${BaseUrl}/users/user/getuser/${id}`, {
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

export const Checktokenexpired = async () => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/users/Checktokenexpired`, {
      method: "GET",
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
