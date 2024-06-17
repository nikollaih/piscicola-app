import {Constants, Utilities} from "../util";

export const get = async (token: String) => {
  return await fetch(`${Constants.API.URL}supplies`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "GET",
  });
};

export const create = async (token: String, data: any) => {
  const fetchUrl = (data.id) ? `${Constants.API.URL}supplies/${data.id}/update` : `${Constants.API.URL}supplies/store`;
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