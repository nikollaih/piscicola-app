import { Constants } from "../util";

export const get = async (token: String) => {
  let response = await fetch(Constants.API.URL + "users/list", {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: "GET",
  });
  return response;
};

export const create = async (token: String, data: any) => {
  console.log(Constants.API.URL + "users")
  console.log(data)
  let response = await fetch(Constants.API.URL + "users", {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + token,
    },
    method: data?.id ? "PUT" : "POST",
    body: JSON.stringify(data), //* <-- Post parameters
  });
  return response;
};
