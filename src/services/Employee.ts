import {Constants} from "../util";

export const get = async (user: any, internalRoleId: Number) => {
  return await fetch(`${Constants.API.URL}personas/${internalRoleId}`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
  });
};

export const create = async (token: String, data: any) => {
  let fetchUrl = (data.id) ? `${Constants.API.URL}personas/${data.id}/update` : `${Constants.API.URL}personas/store-party`;
  return await fetch(fetchUrl, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "POST",
    body: JSON.stringify(data), //* <-- Post parameters
  });
};

export const remove = async (token: String, personID: Number) => {
  return await fetch(`${Constants.API.URL}personas/${personID}`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "DELETE",
  });
};