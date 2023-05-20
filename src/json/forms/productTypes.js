import productTypesStructure from "../formsStructure/productTypesStructure";

export default
    {
        form_name: "ProductTypes",
        structure: productTypesStructure,
        fields: {
            name: {
                icon: "ios-person",
                title: "Nombre",
                placeholder: "Nombre",
                type: "input",
                validate: {
                    required: true,
                    min_length: 10
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