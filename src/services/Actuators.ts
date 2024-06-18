import {Constants, Utilities} from "../util";

export const get = async (token: String) => {
    return await fetch(`${Constants.API.URL}actuators`, {
        headers: {
            ...Constants.CONFIG.HEADERS,
            Authorization: "Bearer " + token,
        },
        method: "GET",
    });
};

export const getFormData = async (token: String) => {
    return await fetch(`${Constants.API.URL}actuators/getInfoToCreateActuator`, {
        headers: {
            ...Constants.CONFIG.HEADERS,
            Authorization: "Bearer " + token,
        },
        method: "GET",
    });
};


export const create = async (token: String, data: any) => {
    const fetchUrl = (data.id) ? `${Constants.API.URL}actuators/${data.id}/update` : `${Constants.API.URL}actuators/store`;
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

export const remove = async (token: String, actuatorID: Number) => {
    return await fetch(`${Constants.API.URL}actuators/${actuatorID}`, {
        headers: {
            ...Constants.CONFIG.HEADERS,
            Authorization: "Bearer " + token,
        },
        method: "DELETE",
    });
};