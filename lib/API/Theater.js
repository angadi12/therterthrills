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

export const Gettheaterlocationsandslots = async (locations,date) => {
  try {
    let result = await fetch(`${BaseUrl}/Theater/availableSlotsByLocation?${locations}`, {
      method: "GET",
      body: JSON.stringify(date),
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