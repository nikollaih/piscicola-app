import { Constants } from "../util";

export const get = async (token: String, puID: String = "") => {
  let response = await fetch(`${Constants.API.URL}ponds/list_by_productive_unit/${puID}`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "GET",
  });
  return response;
};

export const create = async (token: String, data: any) => {
  let response = await fetch(`${Constants.API.URL}ponds`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: data?.id ? "PUT" : "POST",
    body: JSON.stringify(data), //* <-- Post parameters
  });
  return response;
};

export const remove = async (token: String, pondID: Number) => {
  let response = await fetch(`${Constants.API.URL}ponds/${pondID}` , {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "DELETE",
  });
  return response;
};