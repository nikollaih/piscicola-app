import userStructure from "../formsStructure/userStructure";

export default
    {
        form_name: "User",
        structure: userStructure,
        fields: {
            document: {
                icon: "ios-card",
                title: "Documento",
                placeholder: "Número de documento",
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: true,
                    min_length: 7
                }
            },
            name: {
                icon: "ios-person",
                title: "Nombre",
                placeholder: "Nombre completo",
                type: "input",
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
            mobile_phone: {
                icon: "ios-card",
                title: "Celular",
                placeholder: "Número de celular",
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: true,
                    min_length: 10
                }
            },
            password: {
                icon: "ios-lock-open",
                title: "Contraseña",
                placeholder: "*****",
                type: "input",
                secure_entry_text: true,
                hide_on_edit: true,
                validate: {
                    required: true,
                    min_length: 8
                }
            },
            password_confirmation: {
                icon: "ios-lock-open",
                title: "Confirmar Contraseña",
                placeholder: "*****",
                type: "input",
                secure_entry_text: true,
                hide_on_edit: true,
                validate: {
                    required: true,
                    is_equal_than: { is_active: true, text: "Las contraseñas no coinciden", field: "password" },
                    min_length: 8
                }
            },
        }
    }
