import { Constants } from "../util";

export const get = async (token: String, puID: Number, filter: String = "") => {
  let response = await fetch(`${Constants.API.URL}sowings/list_by_productive_unit/${puID}${filter}`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "GET",
  });
  return response;
};

export const getSowingCurrentStats = async (token: String, sowingID: Number) => {
  let response = await fetch(`${Constants.API.URL}sowings/stats/list_by_sowing/${sowingID}/current`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "GET",
  });
  return response;
};

export const create = async (token: String, data: any) => {
  let response = await fetch(Constants.API.URL + "sowings", {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: data?.id ? "PUT" : "POST",
    body: JSON.stringify(data), //* <-- Post parameters
  });
  return response;
};

export const getStatsHistory = async (token: String, filters: {}) => {

  console.log(filters)
  let response = await fetch(Constants.API.URL + "sowings/stats/list_group_by_keys", {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "POST",
    body: JSON.stringify(filters), //* <-- Post parameters
  });
  return response;
}