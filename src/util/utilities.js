import { showMessage } from "react-native-flash-message";
import { UsersServices } from "../services";
import * as Texts from "./texts.json";

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
    let filter = (userTypeId) ? `?userTypeId=${userTypeId}` : "";
    let response = await UsersServices.get(token, filter);
    return response.status == 200 ? await response.json() : [];
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
}

const showErrorMessage = (description = null) => {
  showMessage({
    message: Texts.error.title,
    description: description ? description : Texts.error.common,
    duration: 3000,
    type: "danger",
  });
};