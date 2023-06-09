import { View } from "react-native";
import { Constants } from "../../util";
import { useState, useEffect } from "react";
import { CustomTextInput } from "./textInput/textInput";
import { CustomSelectInput } from "./selectInput/customSelectInput";
import { CustomDateInput } from "./dateInput/customDateInput";
import { useForm } from "../../hooks/useForm";

export const CustomForm = ({ formName }) => {
  const { dataForm } = useForm();
  useEffect(() => {}, []);

  const getCustomDateInput = (field, name) => {
    return (
      <CustomDateInput
        key={name}
        formName={formName}
        data={{ ...field, name }}
      />
    );
  };

  const getCustomInput = (field, name) => {
    return (
      <CustomTextInput
        key={name}
        formName={formName}
        data={{ ...field, name }}
      />
    );
  };

  const getCustomSelectInput = (field, name) => {
    return (
      <CustomSelectInput
        key={name}
        formName={formName}
        data={{ ...field, name }}
      />
    );
  };

  getFormDom = (fields, structure) => {
    return Object.keys(fields).map((key) => {
      if (
        fields[key] &&
        (!structure?.id || (structure?.id && !fields[key]?.hide_on_edit))
      )
        switch (fields[key]?.type) {
          case "input":
            return getCustomInput(fields[key], key);
            break;
          case "select":
            return getCustomSelectInput(fields[key], key);
            break;
          case "date":
            return getCustomDateInput(fields[key], key);
            break;

          default:
            break;
        }
      else return null;
    });
  };

  return (
    <View>
      {getFormDom(dataForm[formName].fields, dataForm[formName].structure)}
    </View>
  );
};
