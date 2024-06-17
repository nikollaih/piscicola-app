import {Constants, Utilities} from "../util";

export const get = async (token: String, supplyID: String = "") => {
  return await fetch(`${Constants.API.URL}supplies/${supplyID}/view`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "GET",
  });
};

export const create = async (token: String, data: any) => {
  const postData = JSON.stringify(Utilities.dataToFormDataAPI(data));
  const fetchUrl = (data.id) ? `${Constants.API.URL}supplies/purchases/update/${data.id}` : `${Constants.API.URL}supplies/purchases/store`;

  return await fetch(fetchUrl, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "POST",
    body: postData, //* <-- Post parameters
  });
};

export const remove = async (token: String, stockID: Number) => {
  return await fetch(`${Constants.API.URL}supplies/purchases/${stockID}`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "DELETE",
  });
};