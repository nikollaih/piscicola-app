import medicationStructure from "../formsStructure/medicationStructure";
import { Constants } from "../../util";

export default
    {
        form_name: "Supply",
        structure: {...medicationStructure},
        fields: {
            quantity: {
                title: "Cantidad",
                placeholder: "10",
                keyboard:"number",
                type: "input",
                validate: {
                    required: true,
                }
            },
            cost_unity: {
                title: "Precio",
                placeholder: "$0",
                keyboard:"number",
                type: "input",
                validate: {
                    required: true,
                }
            }
        }
    }
