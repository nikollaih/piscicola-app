import { Constants } from "../util";

export const get = async (loggedUser: any, fishID: String = "") => {
  let response = await fetch(`${Constants.API.URL}fish_steps/stats/list_by_fish_step/${fishID}`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + loggedUser.token,
    },
    method: "GET",
  });
  return response;
};

export const create = async (token: String, data: any) => {
  let response = await fetch(`${Constants.API.URL}fish_steps/stats`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: data?.id ? "PUT" : "POST",
    body: JSON.stringify(data), //* <-- Post parameters
  });
  return response;
};

export const remove = async (token: String, fishStatsID: Number) => {
  let response = await fetch(`${Constants.API.URL}fish_steps/stats/${fishStatsID}` , {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "DELETE",
  });
  return response;
};