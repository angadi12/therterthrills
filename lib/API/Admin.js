import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const Getadminsbybranchid = async (id) => {
  try {
    let result = await fetch(`${BaseUrl}/Admin/get/admin/${id}`, {
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


export const Getadminbyid = async (id) => {
  try {
    let result = await fetch(`${BaseUrl}/Admin/getsingle/admin/${id}`, {
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



export const Createadminapi = async (data) => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/users/user/create`, {
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


export const Upadteadminapi = async (data,id) => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/users//user/update/${id}`, {
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

export const Deleteadminapi = async (id) => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/Admin/Delete/admin/${id}`, {
      method: "DELETE",
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


