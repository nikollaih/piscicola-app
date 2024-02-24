import actuatorStructure from "../formsStructure/actuatorStructure";
import { Constants } from "../../util";

export default
{
    form_name: "Actuator",
    structure: {...actuatorStructure},
    fields: {
        name: {
            title: "Nombre",
            placeholder: "",
            type: "input",
            validate: {
                required: true
            }
        },
        type: {
            icon: "ios-business",
            title: "Tipo de actuador",
            placeholder: "- Seleccionar",
            type: "select",
            item_label: "nombre",
            item_id: "id",
            items: [
                {
                    nombre: "Oxigeno",
                    id: 1
                },
                {
                    nombre: "Temperatura",
                    id: 2
                },
                {
                    nombre: "Turbidez",
                    id: 3
                }
            ],
            validate: {
                required: true,
            }
        },
        manual_created_at: {
            title: "Fecha de registro",
            placeholder: "",
            type: "date",
            format: Constants.DATETIME_FORMATS.DATETIME,
            validate: {
                required: true
            }
        },
    }
}
