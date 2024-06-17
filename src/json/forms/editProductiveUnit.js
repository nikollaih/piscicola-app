import productiveUnitStructure from '../formsStructure/productiveUnitStructure';
export default
    {
        form_name: "EditProductiveUnit",
        structure: productiveUnitStructure,
        fields: {
            name: {
                icon: "ios-business",
                title: "Nombre de la unidad productiva",
                placeholder: "Nombre",
                type: "input",
                default: "",
                validate: {
                    required: true,
                    min_length: 5
                }
            },
            email: {
                title: "Correo electrónico",
                placeholder: "asociacion@ejemplo.com",
                is_large: false,
                type: "input",
                keyboard_type: "email-address",
                validate: {
                    required: true,
                    is_email: true
                }
            },
            phone: {
                title: "Teléfono",
                placeholder: "3334455",
                is_large: false,
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: false
                }
            },
            mobile_phone: {
                title: "Celular",
                placeholder: "3334455666",
                is_large: false,
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: true,
                    min_length: 10
                }
            },
            mqtt_id: {
                title: "MQTT ID",
                placeholder: "3fd45",
                is_large: false,
                type: "input",
                validate: {
                    required: true,
                }
            },
            address: {
                icon: "ios-map",
                title: "Ubicación",
                placeholder: "",
                bottom: 0,
                type: "input",
                is_large: false,
                validate: {
                    required: true,
                    min_length: 5
                }
            }
        }
    }
