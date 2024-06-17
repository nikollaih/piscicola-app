import supplyStockStructure from "../formsStructure/supplyStockStructure";
import { Constants } from "../../util";

export default
    {
        form_name: "SupplyStock",
        structure: {...supplyStockStructure},
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
            price: {
                title: "Precio",
                placeholder: "$0",
                keyboard:"number",
                type: "input",
                validate: {
                    required: true,
                }
            },
            manual_created_at: {
                icon: "ios-calendar",
                title: "Fecha de compra",
                placeholder: "Fecha",
                type: "date",
                format: Constants.DATETIME_FORMATS.DATETIME,
                bottom: 0,
                validate: {
                    required: true,
                }
            }
        }
    }
