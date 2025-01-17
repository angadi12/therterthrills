import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const Getbranch = async () => {
  try {
    let result = await fetch(`${BaseUrl}/Branch/get/branch`, {
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
    let result = await fetch(`${BaseUrl}/Branch/get/branch/${id}`, {
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

// export const Getbranchdetailsbyid = async (id) => {
//   try {
//     let result = await fetch(`${BaseUrl}/Branch/get/branch/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//       },
//     });
//     result = await result.json();
//     return result;
//   } catch (error) {
//     return error.message;
//   }
// };


// export const Createbranchapi = async (data) => {
//   const token = Cookies.get("token");
//   try {
//     let result = await fetch(`${BaseUrl}/Branch/create/branch`, {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-type": "application/json",
//         token: token,
//       },
//     });
//     result = await result.json();
//     return result;
//   } catch (error) {
//     console.log(error.message);
//     return error.message;
//   }
// };

export const Createbranchapi = async (formData) => {
  try {
    let result = await fetch(`${BaseUrl}/Branch/create/branch`, {
      method: "POST",
      body: formData,
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};






export const Upadtebranchapi = async (data,id) => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/Branch/update/branch/${id}`, {
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

export const Deletebranchapi = async (id) => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/Branch/delete/${id}`, {
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


export const Getbranchanalytics = async () => {
  try {
    let result = await fetch(`${BaseUrl}/Branch/get/getBranchAnalytics`, {
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


export const Getbranchsummary = async (id) => {
  try {
    let result = await fetch(`${BaseUrl}/Branch/bookings/summary-by-branch/${id}`, {
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

export const Getbranchdetails = async (id) => {
  try {
    let result = await fetch(`${BaseUrl}/Branch/details-by-branch/${id}`, {
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