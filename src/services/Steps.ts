import { Constants } from "../util";

export const get = async (token: String, filter: String = "") => {
  let response = await fetch(Constants.API.URL + "steps/list" + filter, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "GET",
  });
  return response;
};

export const create = async (token: String, data: any) => {
  let response = await fetch(Constants.API.URL + "steps", {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: data?.id ? "PUT" : "POST",
    body: JSON.stringify(data), //* <-- Post parameters
  });
  return response;
};