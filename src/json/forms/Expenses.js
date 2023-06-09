import expensesStructure from "../formsStructure/expenses";
import { Constants } from "../../util";

export default
    {
        form_name: "Espense",
        structure: {...expensesStructure},
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
            cost: {
                icon: "ios-cash",
                title: "Precio",
                placeholder: "$0",
                type: "input",
                validate: {
                    required: true,
                }
            },
            description: {
                icon: "ios-list",
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
