import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const Getnotifications = async () => {
  try {
    let result = await fetch(`${BaseUrl}/Notification/notifications`, {
      method: "GET",
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



export const DeleteNotification = async (id) => {

  try {
    let result = await fetch(`${BaseUrl}/Notification/Updatenotifications/${id}`, {
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



