import { Constants, Utilities } from "../util";

export const get = async (token: String, supplyID: String = "") => {
  let response = await fetch(`${Constants.API.URL}supplies/stocks/list_by_supply_id/${supplyID}`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "GET",
  });
  return response;
};

export const create = async (token: String, data: any) => {
  const postData = JSON.stringify(Utilities.dataToFormDataAPI(data));
  let response = await fetch(`${Constants.API.URL}supplies/stocks`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: data?.id ? "PUT" : "POST",
    body: postData, //* <-- Post parameters
  });
  return response;
};

export const remove = async (token: String, stockID: Number) => {
  let response = await fetch(`${Constants.API.URL}supplies/stocks/${stockID}` , {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "DELETE",
  });
  return response;
};