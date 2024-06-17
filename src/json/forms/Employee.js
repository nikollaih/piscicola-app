import employeeStructure from "../formsStructure/employeeStructure";

export default
    {
        form_name: "Employee",
        structure: {...employeeStructure},
        fields: {
            document: {
                icon: "ios-card",
                title: "Número de identificación",
                placeholder: "123456789",
                keyboard_type: "numeric",
                type: "input",
                validate: {
                    required: true,
                }
            },
            name: {
                icon: "ios-person",
                title: "Nombre completo",
                placeholder: "Jhon Doe",
                type: "input",
                validate: {
                    required: true,
                    min_length: 4
                }
            },
            home_phone: {
                icon: "ios-call",
                title: "Teléfono",
                placeholder: "000-000-0000",
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: false
                }
            },
            mobile_phone: {
                icon: "ios-call",
                title: "Celular",
                placeholder: "000-000-0000",
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: true,
                    min_length: 10
                }
            },
            email: {
                icon: "ios-mail",
                title: "Correo electronico",
                placeholder: "ejemplo@ejemplo.com",
                bottom: 0,
                type: "input",
                required: true,
                keyboard_type: "email-address",
                validate: {
                    required: true,
                    is_email: { is_active: true, text: "El email no es válido" }
                }
            },
        }
    }
