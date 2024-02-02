import { Constants, Utilities } from "../util";

export const get = async (user: any, puID: Number) => {
  let urlFetch = `${Constants.API.URL}earnings/list_by_productive_unit/${puID}`;

  let response = await fetch(urlFetch, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
  });
  return response;
};

export const create = async (token: String, data: any) => {
  let response = await fetch(`${Constants.API.URL}earnings`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: data?.id ? "PUT" : "POST",
    body: JSON.stringify(Utilities.dataToFormDataAPI(data)), //* <-- Post parameters
  });
  return response;
};

export const remove = async (token: String, id: Number) => {
  let response = await fetch(`${Constants.API.URL}earnings/${id}` , {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "DELETE",
  });
  return response;
};