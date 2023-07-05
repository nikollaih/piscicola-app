import employeeStructure from "../formsStructure/employeeStructure";

export default
    {
        form_name: "Employee",
        structure: {...employeeStructure},
        fields: {
            identifier_type: {
                icon: "ios-card",
                title: "Tipo de identificación",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "nombre",
                item_id: "id",
                items: [
                    {
                        nombre: "Cedula de ciudadanía",
                        id: "cc"
                    },
                ],
                validate: {
                    required: true,
                }
            },
            identifier: {
                icon: "ios-card",
                title: "Número de identificación",
                placeholder: "123456789",
                keyboard_type: "numeric",
                type: "input",
                validate: {
                    required: true,
                }
            },
            full_name: {
                icon: "ios-person",
                title: "Nombre completo",
                placeholder: "Jhon Doe",
                type: "input",
                validate: {
                    required: true,
                    min_length: 10
                }
            },
            occupation: {
                icon: "ios-person",
                title: "Ocupación",
                placeholder: "Ocupación",
                type: "input",
                validate: {
                    required: true,
                    min_length: 10
                }
            },
            phone: {
                icon: "ios-call",
                title: "Teléfono",
                placeholder: "000-000-0000",
                bottom: 0,
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: true,
                    min_length: 7
                }
            },
        }
    }
