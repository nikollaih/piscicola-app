import { Constants, Utilities } from "../util";

export const get = async (user: any, filter: any) => {
  let urlFetch = Constants.API.URL + "equipments/list_by_sowing/" + filter.sowing.id;

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
  let response = await fetch(`${Constants.API.URL}equipments`, {
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
  let response = await fetch(`${Constants.API.URL}equipments/${id}` , {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "DELETE",
  });
  return response;
};