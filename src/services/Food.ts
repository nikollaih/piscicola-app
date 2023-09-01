import { Constants, Utilities } from "../util";

export const get = async (token: String, sowingID: String = "") => {
  console.log(`${Constants.API.URL}supplies_used/aliments/list_by_sowing_id/${sowingID}`)
  let response = await fetch(`${Constants.API.URL}supplies_used/aliments/list_by_sowing_id/${sowingID}`, {
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
  let response = await fetch(`${Constants.API.URL}supplies_used/aliments`, {
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
  let response = await fetch(`${Constants.API.URL}supplies_used/aliments/${stockID}` , {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "DELETE",
  });
  return response;
};