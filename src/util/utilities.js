import { showMessage } from "react-native-flash-message";
import { UsersServices } from "../services";
import * as Texts from "./texts.json";
import { Alert, Linking } from "react-native";
import moment from "moment";
import { Constants } from ".";

// Open url browser
export const openUrl = (url) => {
  Linking.openURL(url);
};

export const capitalize = (text) => {
  return text.length > 0 ? text.charAt(0).toUpperCase() + text.slice(1) : text;
};

export const showAlert = ({
  text = Texts.error.common,
  type = "danger",
  title = Texts.error.title,
}) => {
  showMessage({
    message: title,
    description: text,
    duration: 3000,
    type: type,
  });
};

export const getUsersByType = async (token, userTypeId = null) => {
  try {
    let filter = userTypeId ? `?userTypeId=${userTypeId}` : "";
    let response = await UsersServices.get(token, filter);
    return response.status == 200 ? await response.json() : { data: [] };
  } catch (error) {
    return [];
  }
};

export const showErrorFecth = (jsonResponse) => {
  if (jsonResponse?.error_code || jsonResponse?.code) {
    let errorCode = jsonResponse?.error_code
      ? jsonResponse?.error_code
      : jsonResponse?.code;
    showErrorMessage(Texts.error.code[errorCode]);
  } else showErrorMessage(jsonResponse?.message);
};

const showErrorMessage = (description = null) => {
  showMessage({
    message: Texts.error.title,
    description: description ? description : Texts.error.common,
    duration: 3000,
    type: "danger",
  });
};

export const confirmDelete = async (message = "") =>
  new Promise((resolve) => {
    Alert.alert(
      "¿Está seguro?",
      message,
      [
        {
          text: "Cancelar",
          onPress: () => {
            resolve({ status: false });
          },
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            resolve({ status: true });
          },
        },
      ],
      { cancelable: true }
    );
  });

/**
 * Changes the format of a date string for API requests.
 * @param {Object} params - The parameters object.
 * @param {string} params.date - The date string to be formatted.
 * @param {string} [params.format] - The desired format for the date string. If not provided, the default format will be used.
 * @returns {string} The formatted date string.
 */
export const changeDateFormatForAPI = (params) => {
  const NEW_FORMAT = params?.format ? params.format : "YYYY-MM-DD HH:mm:ss";
  if (moment(params.date, "YYYY-MM-DDTHH:mm:ss.SSSZ", true).isValid() === true)
    return moment(params.date, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(NEW_FORMAT);

  return params.date;
};

/**
 * Converts the given data object to a FormData object, while also converting any
 * date values to the correct format for API requests.
 * @param {object} data - The data object to convert.
 * @returns {object} - The converted FormData object.
 */
export const dataToFormDataAPI = (data) => {
  for (let key in data) {
    if (moment(data[key], "YYYY-MM-DDTHH:mm:ss.SSSZ", true).isValid() === true)
      data[key] = changeDateFormatForAPI({ date: data[key] });
  }

  return data;
};

/**
 * Removes all non-numeric characters from the given input string.
 * @param {string} inputString - The string to remove non-numeric characters from.
 * @returns {string} The input string with all non-numeric characters removed.
 */
export const removeNonNumericCharacters = (inputString) => {
  return inputString.replace(/[^0-9]/g, '');
}

export const getSupplyName = (key = "ALIMENT") => {
  switch (key) {
    case "ALIMENT":
      return {name: "Alimento"}
      break;
  
    default:
      break;
  }
}