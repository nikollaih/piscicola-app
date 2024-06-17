import {Constants} from "../util";

export const get = async (token: String) => {
    return await fetch(Constants.API.URL + "associations", {
        headers: {
            ...Constants.CONFIG.HEADERS,
            Authorization: "Bearer " + token,
        },
        method: "GET",
    });
};

export const create = async (token: String, data: any) => {
    let fetchUrl = (data.id) ? `${Constants.API.URL}associations/${data.id}/update` : `${Constants.API.URL}associations/store`;
    return await fetch(fetchUrl, {
        headers: {
            ...Constants.CONFIG.HEADERS,
            Authorization: "Bearer " + token,
        },
        method: "POST",
        body: JSON.stringify(data), //* <-- Post parameters
    });
};

export const remove = async (token: String, puID: Number) => {
    return await fetch(`${Constants.API.URL}associations/${puID}`, {
        headers: {
            ...Constants.CONFIG.HEADERS,
            Authorization: "Bearer " + token,
        },
        method: "DELETE",
    });
};
