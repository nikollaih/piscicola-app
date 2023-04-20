import userStructure from "../formsStructure/userStructure";

export default
    {
        form_name: "User",
        structure: userStructure,
        fields: {
            user_type_id: {
                icon: "ios-beaker",
                title: "Rol",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "nombre",
                item_id: "id",
                items: [
                    {
                        nombre: "Administrador",
                        id: 1
                    },
                    {
                        nombre: "Productor",
                        id: 2
                    },
                    {
                        nombre: "Investigador",
                        id: 3
                    },
                ],
                validate: {
                    required: true,
                }
            },
            full_name: {
                icon: "ios-person",
                title: "Nombre",
                placeholder: "Nombre completo",
                type: "input",
                validate: {
                    required: true,
                }
            },
            email: {
                icon: "ios-mail",
                title: "Correo electronico",
                placeholder: "ejemplo@ejemplo.com",
                bottom: 0,
                type: "input",
                required: true,
                validate: {
                    required: true,
                    is_email: { is_active: true, text: "El email no es válido" }
                }
            },
            password: {
                icon: "ios-lock-open",
                title: "Contraseña",
                placeholder: "*****",
                type: "input",
                secure_entry_text: true,
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
                validate: {
                    required: true,
                    is_equal_than: { is_active: true, text: "Las contraseñas no coinciden", field: "password" },
                    min_length: 8
                }
            },
        }
    }
