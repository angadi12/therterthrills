import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const Createorder = async (data) => {
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
export const Createtheater = async (data) => {
  try {
    let result = await fetch(`${BaseUrl}/Theater/theater/create`, {
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


export const Gettheaterlocations = async () => {

  try {
    let result = await fetch(`${BaseUrl}/Theater/theater/locations`, {
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

export const GetAlltheater = async (date) => {

  try {
    let result = await fetch(`${BaseUrl}/Theater/theater/getall?date=${date}`, {
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

export const Gettheaterbyid = async (id) => {

  try {
    let result = await fetch(`${BaseUrl}/Theater/theater/get/${id}`, {
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

export const Getalltheaterbybranchid = async (id) => {

  try {
    let result = await fetch(`${BaseUrl}/Theater/theater/branch/${id}`, {
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

export const GetTheateravailablitybyid = async (id) => {

  try {
    let result = await fetch(`${BaseUrl}/Theater/theater/${id}/available-slots`, {
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

export const Gettheaterlocationsandslots = async (data) => {
  try {
    let result = await fetch(`${BaseUrl}/Theater/availableSlotsByLocation`, {
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
