import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";


export const CreateExpanseapi = async (data) => {
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/Expenses/create/expense`, {
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
  
  

  export const GetExpensebyBranch = async (id) => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/expence/get/expense/branch/${id}`, {
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

  export const GetExpensebyBranchidanddaterange = async ({ branchId, from, to }) => {
    const token = Cookies.get("token");
    const query = new URLSearchParams();
    if (from) query.append("startDate", from);
    if (to) query.append("endDate", to);
  
    try {
      let result = await fetch(`${BaseUrl}/Expenses/get/expense/branch/${branchId}?${query.toString()}`, {
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



  export const Getexpensebyid = async (id) => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/expence/get/expense/${id}`, {
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
  

  export const UpadteExpenseapi = async (data,id) => {
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/expence/create/expence/${id}`, {
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

  export const Deleteexpanse = async (id) => {
    const token = Cookies.get("token");
    try {
      let result = await fetch(`${BaseUrl}/Expenses/delete/expense/${id}`, {
        method: "DELETE",
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