import React from 'react';

const FormContext = React.createContext();

const FormProvider = ({ children }) => {
    const [dataForm, setDataForm] = React.useState({});
    const [checkRequired, setCheckrequired] = React.useState({});

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
            if (fields[field]?.required && (structure[field] == null || structure[field] == ""))
                validated = false;
        })

        return validated;
    }

    return (
        <FormContext.Provider value={{ dataForm, setDataForm, checkRequired, setCheckrequired, isValidated }}>
            {children}
        </FormContext.Provider>
    )
}

export { FormContext, FormProvider }