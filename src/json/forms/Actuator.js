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
        cost_by_minute: {
            title: "Costo por minuto",
            placeholder: "",
            type: "input",
            keyboard_type: "numeric",
            validate: {
                required: true
            }
        },
        actuator_type_id: {
            title: "Tipo de actuador",
            placeholder: "- Seleccionar",
            type: "select",
            item_label: "name",
            item_id: "id",
            items: [],
            validate: {
                required: true,
            }
        },
        pond_id: {
            title: "Estanque",
            placeholder: "- Seleccionar",
            type: "select",
            item_label: "name",
            item_id: "id",
            items: [],
            validate: {
                required: true,
            }
        },
        mqtt_id: {
            title: "MQTT ID",
            placeholder: "",
            type: "input",
            validate: {
                required: true
            }
        },
        description: {
            title: "Descripción",
            placeholder: "",
            type: "input",
            bottom: 0,
            is_large: true,
            validate: {
                required: false
            }
        },
    }
}
