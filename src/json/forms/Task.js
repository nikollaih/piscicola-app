import taskStructure from "../formsStructure/taskStructure";
import { Constants } from "../../util";

export default
    {
        form_name: "Task",
        structure: {...taskStructure},
        fields: {
            name: {
                icon: "ios-list",
                title: "Nombre de la tarea",
                placeholder: "",
                type: "input",
                validate: {
                    required: true,
                    min_length: 5
                }
            },
            description: {
                title: "Descripción",
                placeholder: "Escribe una descripción de la tarea...",
                type: "input",
                is_large: true,
                validate: {
                    required: true,
                    min_length: 5
                }
            }
        }
    }
