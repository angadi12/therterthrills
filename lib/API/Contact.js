import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const CreatTicket = async (data) => {
  try {
    let result = await fetch(`${BaseUrl}/Contact/contact/create`, {
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

export const GetAllticket = async () => {

  try {
    let result = await fetch(`${BaseUrl}/Contact//contact/getall`, {
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

