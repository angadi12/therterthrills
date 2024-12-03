import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const GetAlltheateranalytics = async (id,year=new Date().getFullYear()) => {
  const queryParams = new URLSearchParams({ year: year.toString() });

    try {
      let result = await fetch(`${BaseUrl}/Theater/theater/getTheaterAnalytics/${id}?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      result = await result.json();
      console.log(result)
      return result;
    } catch (error) {
      return error.message;
    }
  };