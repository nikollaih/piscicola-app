import supplyStructure from "../formsStructure/supplyStructure";
import { Constants } from "../../util";

export default
    {
        form_name: "Supply",
        structure: {...supplyStructure},
        fields: {
            name: {
                title: "Nombre",
                placeholder: "Nombre",
                type: "input",
                validate: {
                    required: true,
                }
            },
            total_price: {
                title: "Precio",
                placeholder: "$0",
                keyboard_type:"numeric",
                type: "input",
                validate: {
                    required: true,
                }
            },
            quantity: {
                title: "Cantidad",
                placeholder: "10",
                keyboard_type:"numeric",
                type: "input",
                validate: {
                    required: true,
                }
            },
            measurement_unit_id: {
                title: "Unidad de medida",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "name",
                item_id: "id",
                items: [],
                validate: {
                    required: true,
                }
            },
            use_type: {
                title: "Uso",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "name",
                item_id: "id",
                items: Constants.USE_TYPES,
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
                title: "Notas",
                placeholder: "Escriba algunas notas...",
                is_large: true,
                type: "input",
                bottom: 0,
                validate: {
                    required: false,
                }
            },

        }
    }
