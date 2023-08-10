import { Constants } from "../util";

export const get = async (user: any, filter: any) => {
  let fetchUrl = filter?.type
    ? `${Constants.API.URL}unit_types/list_by_filters?type=${filter.type}`
    : `${Constants.API.URL}unit_types/list_by_filters`;
  let response = await fetch(fetchUrl, {
    headers: {
      ...Constants.CONFIG.HEADERS,
      Authorization: "Bearer " + user.token,
    },
    method: "GET",
  });
  return response;
};
