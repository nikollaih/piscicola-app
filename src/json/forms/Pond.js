import pondStructure from "../formsStructure/pondStructure";
import { Constants } from "../../util";
export default
    {
        form_name: "Pond",
        structure: {...pondStructure},
        fields: {
            name: {
                icon: "trash-bin-sharp",
                title: "Nombre",
                placeholder: "Nombre",
                type: "input",
                validate: {
                    required: true,
                    min_length: 8
                }
            },
            sensor_id: {
                icon: "ios-map",
                title: "Sensor ID",
                placeholder: "QW6G372",
                bottom: 0,
                type: "input",
                validate: {
                    required: true,

                }
            },
            description: {
                title: "Descripcion",
                placeholder: "",
                type: "input",
                validate: {
                    required: true
                }
            }
        }
    }
