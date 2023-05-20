import stepsStructure from '../formsStructure/stepsStructure';
export default
    {
        form_name: "EditStep",
        structure: stepsStructure,
        fields: {
            name: {
                icon: "ios-business",
                title: "Nombre ",
                placeholder: "Alevinaje",
                type: "input",
                default: "",
                validate: { 
                    required: true,
                    min_length: 5
                }
            },
            description: {
                title: "Descripción",
                placeholder: "Escriba una descripción...",
                is_large: true,
                type: "input",
                validate: {}
            },
        }
    }
