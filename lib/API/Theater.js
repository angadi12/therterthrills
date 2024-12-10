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
export const Createtheater = async (formData) => {
  try {
    let result = await fetch(`${BaseUrl}/Theater/theater/create`, {
      method: "POST",
      body: formData,
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};


export const Gettheaterlocations = async (id) => {

  try {
    let result = await fetch(`${BaseUrl}/Theater/theater/locations/${id}`, {
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

// export const Getalltheaterbybranchid = async (id) => {

//   try {
//     let result = await fetch(`${BaseUrl}/Theater/theater/branch/${id}`, {
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


export const Getalltheaterbybranchid = async (id) => {
  try {
    const result = await fetch(`${BaseUrl}/Theater/theater/branch/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    // Check if the response status is not OK
    if (!result.ok) {
      // Parse the error response
      const errorData = await result.json();
      throw new Error(errorData.message || "Failed to fetch theaters");
    }

    // Parse and return the successful response
    return await result.json();
  } catch (error) {
    console.error("Fetch Error:", error.message); // Log the error
    throw error; // Propagate the error so it can be caught in createAsyncThunk
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



export const Deletetheatredapi = async (id) => {
  try {
    let result = await fetch(`${BaseUrl}/Theater/theater/delete/${id}`, {
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