import generalExpenseStructure from "../formsStructure/generalExpenseStructure";
import { Constants } from "../../util";

export default
    {
        form_name: "GeneralExpense",
        structure: generalExpenseStructure,
        fields: {
            name: {
                icon: "ios-trending-down",
                title: "Nombre",
                placeholder: "Nombre",
                type: "input",
                validate: {
                    required: true,
                }
            },
            value: {
                icon: "ios-cash",
                title: "Precio",
                placeholder: "$0",
                keyboard_type: "numeric",
                type: "input",
                only_numbers: true,
                validate: {
                    required: true,
                }
            },
            note: {
                title: "Descripción",
                placeholder: "Ingrese una descripción para el gasto realizado",
                type: "input",
                is_large: true,
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
            },
        }
    }
