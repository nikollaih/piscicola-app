import { Constants, Utilities } from "../util";

export const get = async (token: String, puID: String = "") => {
  let response = await fetch(`${Constants.API.URL}payment_details/list_by_productive_unit/${puID}`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "GET",
  });
  return response;
};

export const create = async (token: String, data: any) => {
  const postData = JSON.stringify(Utilities.dataToFormDataAPI(data));
  let response = await fetch(`${Constants.API.URL}payment_details`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: data?.id ? "PUT" : "POST",
    body: postData, //* <-- Post parameters
  });
  return response;
};

export const remove = async (token: String, taskLogID: Number) => {
  let response = await fetch(`${Constants.API.URL}payment_details/${taskLogID}` , {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "DELETE",
  });
  return response;
};