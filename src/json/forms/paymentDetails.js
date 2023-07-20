import paymentDetailsStructure from "../formsStructure/paymentDetailsStructure";
import { Constants } from "../../util";

export default
    {
        form_name: "paymentDetails",
        structure: paymentDetailsStructure,
        fields: {
            employee_id: {
                icon: "ios-people",
                title: "Empleado",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "full_name",
                item_id: "id",
                items: [],
                validate: {required: true}
            },
            payment_type_id: {
                icon: "ios-list",
                title: "Concepto de pago",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "name",
                item_id: "id",
                items: [],
                validate: {required: true}
            },
            task_logs_id: {
                icon: "ios-people",
                title: "Tareas realizadas",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "name",
                item_id: "id",
                is_multiple: true,
                items: [],
                validate: {}
            },
            value: {
                title: "Valor",
                placeholder: "$0",
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: true
                }
            },
            manual_created_at: {
                title: "Fecha de registro",
                placeholder: "",
                type: "date",
                format: Constants.DATETIME_FORMATS.DATETIME,
                validate: {
                    required: true
                }
            },
            note: {
                title: "Notas",
                placeholder: "Escriba una una...",
                type: "input",
                is_large: true,
                validate: {}
            },
        }
    }
