import {Constants} from "../util";

export const get = async (user: any, filter: any) => {
  return await fetch(`${Constants.API.URL}supplies/measurements`, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
  });
};
