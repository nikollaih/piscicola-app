import {Constants} from "../util";

export const get = async (user: any, productiveUnitId: Number) => {
  return await fetch(Constants.API.URL + "users/" + productiveUnitId, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
  });
};

export const remove = async (token: String, userID: Number) => {
  return await fetch(Constants.API.URL + "users/" + userID, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "DELETE",
  });
};

export const create = async (token: String, data: any, productiveUnitId?: Number) => {
  let fetchUrl = (data.id) ? `${Constants.API.URL}users/${data.id}/update` : `${Constants.API.URL}users/store/${productiveUnitId}`;
  return await fetch(fetchUrl, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "POST",
    body: JSON.stringify(data), //* <-- Post parameters
  });
};

export const getUserTypes = async (token: String) => {
  let response = await fetch(Constants.API.URL + "user_types/list", {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "GET",
  });
  return response;
};