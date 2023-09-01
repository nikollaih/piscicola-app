import foodStructure from "../formsStructure/foodStructure";
import { Constants } from "../../util";

export default
    {
        form_name: "Food",
        structure: foodStructure,
        fields: {
            supply_id: {
                icon: "ios-beaker",
                title: "Alimento",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "name",
                item_id: "id",
                items: [],
                validate: {
                    required: true,
                }
            },
            quantity: {
                title: "Cantidad",
                placeholder: "5Kg",
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: true
                }
            },
            apply_at: {
                icon: "ios-calendar",
                title: "Fecha de alimentación",
                placeholder: "Fecha",
                type: "date",
                format: Constants.DATETIME_FORMATS.DATETIME,
                validate: {
                    required: true
                }
            },
        }
    }