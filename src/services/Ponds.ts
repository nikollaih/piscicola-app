import {Constants, Utilities} from "../util";

export const get = async (token: String, puID: String = "") => {
  return await fetch(`${Constants.API.URL}ponds/all`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "GET",
  });
};

export const create = async (token: String, data: any) => {
  const fetchUrl = (data.id) ? `${Constants.API.URL}ponds/${data.id}/update` : `${Constants.API.URL}ponds/store`;
  const postData = JSON.stringify(Utilities.dataToFormDataAPI(data));
  return await fetch(fetchUrl, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "POST",
    body: postData, //* <-- Post parameters
  });
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