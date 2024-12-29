import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const Gettheateranalytics = async (id,year=new Date().getFullYear()) => {
  const queryParams = new URLSearchParams({ year: year.toString() });

    try {
      let result = await fetch(`${BaseUrl}/Theater/theater/getTheaterAnalytics/${id}?${queryParams}`, {
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

export const GetAlltheateranalytics = async (id,year=new Date().getFullYear()) => {
  const queryParams = new URLSearchParams({ year: year.toString() });

    try {
      let result = await fetch(`${BaseUrl}/Theater/theater/getAllTheaterAnalytics/${id}?${queryParams}`, {
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


export const getHourlyTheaterAnalytics = async (id,date) => {
  const queryParams = new URLSearchParams({ date: date.toString() });

    try {
      let result = await fetch(`${BaseUrl}/Theater/theater/getHourlyTheaterAnalytics/${id}?${queryParams}`, {
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

export const getAllHourlyTheaterAnalytics = async (id,date) => {
  const queryParams = new URLSearchParams({ date: date.toString() });

    try {
      let result = await fetch(`${BaseUrl}/Theater/theater/getHourlyAllTheatersAnalytics/${id}?${queryParams}`, {
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