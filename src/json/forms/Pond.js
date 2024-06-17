import pondStructure from "../formsStructure/pondStructure";
import { Constants } from "../../util";
export default
    {
        form_name: "Pond",
        structure: {...pondStructure},
        fields: {
            name: {
                title: "Nombre",
                placeholder: "Nombre",
                type: "input",
                validate: {
                    required: true,
                    min_length: 8
                }
            },
            area: {
                title: "Área (mt2)",
                placeholder: "",
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: false,
                }
            },
            volume: {
                title: "Volumen",
                placeholder: "1500L",
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: false,
                }
            },
            entrance: {
                title: "Caudal de entrada (L/s)",
                placeholder: "",
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: false,
                }
            },
            exit: {
                title: "Caudal de salida (L/s)",
                placeholder: "",
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: false,
                }
            },
            mqtt_id: {
                title: "MQTT ID",
                placeholder: "",
                type: "input",
                validate: {
                    required: true,
                }
            },
            covered: {
                title: "Cubierto",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "name",
                item_id: "id",
                bottom: 0,
                items: [{id: 1, name: "Si"}, {id: 2, name: "No"}],
                validate: {
                    required: true,
                }
            },
        }
    }
