import { Constants } from ".";
import Texts from "../util/texts.json";
import moment from "moment";
/**
 * It returns true if the email is valid, and false if it's not
 * @returns A boolean value.
 */
export const isEmail = (email) => {
  let reg = /[^@!"·$%&#]+@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  return reg.test(email) === false ? false : true;
};

export const checkRequiredField = (data, dataForm, check) => {
  if (check) {
    /* It checks if the field is required and if the field is empty or null and if the form is
        required */
    if (
      data?.validate?.required &&
      (dataForm.structure[data.name] == "" ||
        dataForm.structure[data.name] == null)
    )
      return { status: false, text: "Por favor complete este campo" };

    /* It checks if the field is required and if the field is empty or null and if the value is
        a valid email */
    if (
      data?.validate?.is_email?.is_active &&
      !isEmail(dataForm.structure[data.name])
    )
      return { status: false, text: data.validate.is_email.text };

    /* It checks if the field is required and if the field is empty or null and if the value is
              the same to the another value */
    if (
      data?.validate?.is_equal_than?.is_active &&
      dataForm.structure[data.name] !=
        dataForm.structure[data?.validate?.is_equal_than.field]
    )
      return { status: false, text: data.validate.is_equal_than.text };

    /* It checks if the field is required and if the field lenght enough */
    if (
      data?.validate?.min_length &&
      dataForm.structure[data.name].length < data?.validate?.min_length
    )
      return {
        status: false,
        text:
          Texts.error.min_length + data?.validate?.min_length + " caracteres",
      };

    /* It checks if a date if greater than another */
    if (
      data?.validate?.is_greater_than &&
      (moment(dataForm.structure[data?.validate?.is_greater_than]).format(Constants.DATETIME_FORMATS.DATETIME) == moment(dataForm.structure[data.name]).format(Constants.DATETIME_FORMATS.DATETIME) || moment(dataForm.structure[data?.validate?.is_greater_than]).isAfter(moment(dataForm.structure[data.name])))
    )
      return { status: false, text: Texts.error.stats_history_date_mismatch };

    /* It checks if value is greater than allowed */
    if (
      data?.validate?.max != undefined &&
      dataForm.structure[data.name] > data?.validate?.max
    )
      return { status: false, text: Texts.error.max + data?.validate?.max };

    return { status: true };
  }

  return { status: true };
};
