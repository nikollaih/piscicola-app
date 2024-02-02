import medicationStructure from "../formsStructure/medicationStructure";
import { Constants } from "../../util";

export default
    {
        form_name: "Supply",
        structure: {...medicationStructure},
        fields: {
            name: {
                title: "Nombre",
                placeholder: "Nombre",
                type: "input",
                validate: {
                    required: true,
                }
            },
            total_cost: {
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
            unit_type_id: {
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
            description: {
                title: "Descripción",
                placeholder: "Escriba una descripción...",
                is_large: true,
                type: "input",
                bottom: 0,
                validate: {
                    required: true,
                }
            },
        }
    }
