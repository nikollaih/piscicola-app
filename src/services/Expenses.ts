import {Constants, Utilities} from "../util";

export const get = async (token: String, sowingId = -1, startDate = null, endDate = null) => {
  return await fetch(`${Constants.API.URL}expenses/all/${sowingId}/${startDate}/${endDate}`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "GET",
  });
};

export const getCategories = async (token: String) => {
  return await fetch(`${Constants.API.URL}expenses/categories`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "GET",
  });
};


export const create = async (token: String, data: any, sowingId = "") => {
  const fetchUrl = (data.id) ? `${Constants.API.URL}expenses/${data.id}/update` : `${Constants.API.URL}expenses/store${sowingId}`;
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

export const remove = async (token: String, expenseId: Number) => {
  return await fetch(`${Constants.API.URL}expenses/${expenseId}`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "DELETE",
  });
};