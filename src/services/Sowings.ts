import {Constants, Utilities} from "../util";

export const get = async (token: String) => {
  return await fetch(`${Constants.API.URL}sowings/list`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "GET",
  });
};

export const getSowingCurrentStats = async (token: String, sowingID: Number) => {
  return await fetch(`${Constants.API.URL}sowings/${sowingID}/view`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "GET",
  });
};

export const getSowingCreateData = async (token: String) => {
  return await fetch(`${Constants.API.URL}sowings/createInfo`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "GET",
  });
};

export const create = async (token: String, data: any) => {
  return await fetch(Constants.API.URL + "sowings/store", {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: data?.id ? "PUT" : "POST",
    body: JSON.stringify(Utilities.dataToFormDataAPI(data)), //* <-- Post parameters
  });
};

export const getStatsHistory = async (token: String, filters: {}) => {
  return await fetch(Constants.API.URL + "sowings/stats/list_group_by_keys", {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "POST",
    body: JSON.stringify(filters), //* <-- Post parameters
  });
}