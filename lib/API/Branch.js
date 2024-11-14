import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const Getbranch = async () => {
  try {
    let result = await fetch(`${BaseUrl}/branch/get/branch`, {
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


export const Getbranchbyid = async (id) => {
  try {
    let result = await fetch(`${BaseUrl}/branch/get/branch/${id}`, {
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


// /branch/get/details/branch/

export const Getbranchdetailsbyid = async (id) => {
  try {
    let result = await fetch(`${BaseUrl}/branch/get/details/branch/${id}`, {
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


export const Createbranchapi = async (data) => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/branch/create/branch`, {
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
    console.log(error.message);
    return error.message;
  }
};


export const Upadtebranchapi = async (data,id) => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/branch/update/branch/${id}`, {
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
    console.log(error.message);
    return error.message;
  }
};


