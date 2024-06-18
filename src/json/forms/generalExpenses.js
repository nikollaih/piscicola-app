import generalExpenseStructure from "../formsStructure/generalExpenseStructure";
import { Constants } from "../../util";

export default
    {
        form_name: "GeneralExpense",
        structure: generalExpenseStructure,
        fields: {
            category_id: {
                title: "Categoría",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "name",
                item_id: "id",
                items: [],
                validate: {
                    required: true,
                }
            },
            concept: {
                title: "Concepto del gasto",
                placeholder: "Recibo de energia",
                type: "input",
                validate: {
                    required: true,
                }
            },
            cost: {
                title: "Precio",
                placeholder: "$0",
                keyboard_type: "numeric",
                type: "input",
                only_numbers: true,
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
                validate: {
                    required: true,
                }
            },
            notes: {
                title: "Descripción",
                placeholder: "Ingrese una descripción para el gasto realizado",
                type: "input",
                is_large: true,
                bottom: 0,
                validate: {
                    required: false,
                }
            }
        }
    }
