export default
    {
        form_name: "EditProductiveUnit",
        structure: {
            name: "",
            description: "",
            location: ""
        },
        fields: {
            name: {
                icon: "ios-business",
                title: "Nombre de la unidad productiva",
                placeholder: "Nombre",
                type: "input",
                default: "Asorobles",
                validate: {
                    required: true,
                }
            },
            description: {
                title: "Descripción",
                placeholder: "Escriba una descripción...",
                is_large: true,
                type: "input"
            },
            location: {
                icon: "ios-map",
                title: "Ubicación",
                placeholder: "Ubicación",
                bottom: 0,
                type: "input",
                validate: {
                    required: true,
                }
            }
        }
    }
