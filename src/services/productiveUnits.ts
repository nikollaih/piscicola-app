import { Constants } from "../util";

export const get = async (token: String) => {
  let response = await fetch(Constants.API.URL + "productive_units/list", {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "GET",
  });
  return response;
};

export const create = async (token: String, data: any) => {
  let response = await fetch(Constants.API.URL + "productive_units", {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: data?.id ? "PUT" : "POST",
    body: JSON.stringify(data), //* <-- Post parameters
  });
  return response;
};

export const assignUser = async (token: String, data: any) => {
  let response = await fetch(Constants.API.URL + "productive_units/users", {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "POST",
    body: JSON.stringify(data), //* <-- Post parameters
  });
  return response;
};
