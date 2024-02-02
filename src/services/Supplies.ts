import { Constants, Utilities } from "../util";

export const get = async (token: String, puID: String = "", filter: String = "") => {
  let response = await fetch(`${Constants.API.URL}supplies/list_by_productive_unit_id/${puID}${filter}`, {
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
  let response = await fetch(`${Constants.API.URL}supplies`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: data?.id ? "PUT" : "POST",
    body: postData, //* <-- Post parameters
  });
  return response;
};

export const remove = async (token: String, supplyID: Number) => {
  let response = await fetch(`${Constants.API.URL}supplies/${supplyID}` , {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "DELETE",
  });
  return response;
};