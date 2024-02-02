import saleStructure from "../formsStructure/saleStructure";
import { Constants } from "../../util";

export default
    {
        form_name: "Sale",
        structure: {...saleStructure},
        fields: {
            total_weight: {
                title: "Peso total (Solo números)",
                placeholder: "0",
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: true
                }
            },
            price_unit: {
                title: "Precio unitario (Solo números)",
                placeholder: "0",
                bottom: 0,
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: true
                }
            },
            manual_created_at: {
                title: "Fecha de venta",
                placeholder: "",
                type: "date",
                format: Constants.DATETIME_FORMATS.DATETIME,
                validate: {
                    required: true
                }
            },
        }
    }
