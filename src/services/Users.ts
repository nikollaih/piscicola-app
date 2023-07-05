import { Constants } from "../util";

export const get = async (user: any, filter: String) => {
  let urlFetch =
    user.profile.user_type_id == 1
      ? Constants.API.URL + "users/list" + filter
      : `${Constants.API.URL}productive_units/${user.productive_unit.id}/users`;

  let response = await fetch(urlFetch, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
  });
  return response;
};

export const remove = async (token: String, userID: Number) => {
  let response = await fetch(Constants.API.URL + "users/" + userID, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "DELETE",
  });
  return response;
};

export const create = async (token: String, data: any) => {
  let response = await fetch(Constants.API.URL + "users", {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: data?.id ? "PUT" : "POST",
    body: JSON.stringify(data), //* <-- Post parameters
  });
  return response;
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