import React from "react";
import { Validations } from "../util";

const FormContext = React.createContext();

const FormProvider = ({ children }) => {
  const [dataForm, setDataForm] = React.useState({});
  const [checkRequired, setCheckRequired] = React.useState({});

  /**
   * It returns true if all the required fields in the form are filled, and false otherwise
   * @param formName - The name of the form you want to validate.
   * @returns A boolean value.
   */
  const isValidated = (formName) => {
    let validated = true;
    let form = dataForm[formName];
    let structure = form.structure;
    let fields = form.fields;

    /* Checking if the field is required and if it is empty. */
    Object.keys(structure).map((field) => {
      if (fields[field]) {
        fields[field]["name"] = field;
        let isValidated = Validations.checkRequiredField(
          fields[field],
          form,
          checkRequired
        );
        if (!isValidated.status) {
          validated = false;
        }
      }
    });

    return validated;
  };

  return (
    <FormContext.Provider
      value={{
        dataForm,
        setDataForm,
        checkRequired,
        setCheckRequired,
        isValidated,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
