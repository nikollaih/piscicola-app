import { showMessage } from "react-native-flash-message";
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
