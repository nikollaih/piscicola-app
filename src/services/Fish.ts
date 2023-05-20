import { useReducer } from "react";
import { Constants } from "../util";

export const get = async (user: any, filter: String = "") => {
  let urlFetch = (user.profile.user_type_id == 1) ? 
  Constants.API.URL + "fish_steps/list/all" + filter :
  Constants.API.URL + "fish_steps/list_by_productive_unit/" + user.productive_unit.id + filter;

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
  let response = await fetch(Constants.API.URL + "fish_steps", {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: data?.id ? "PUT" : "POST",
    body: JSON.stringify(data), //* <-- Post parameters
  });
  return response;
};

export const remove = async (token: String, fishID: Number) => {
  let response = await fetch(Constants.API.URL + "fish_steps/" + fishID , {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "DELETE",
  });
  return response;
};
