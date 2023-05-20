import feedStructure from "../formsStructure/feedStructure";
import { Constants } from "../../util";

export default
    {
        form_name: "Feed",
        structure: feedStructure,
        fields: {
            food_id: {
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
                    require: true
                }
            },
            price: {
                icon: "ios-cash",
                title: "Costo aprox.",
                placeholder: "$",
                type: "input",
                is_editable: false,
                validate: {
                    require: true
                }
            },
            date: {
                icon: "ios-calendar",
                title: "Fecha de alimentación",
                placeholder: "Fecha",
                type: "date",
                format: Constants.DATETIME_FORMATS.DATETIME,
                validate: {
                    required: true
                }
            },
            description: {
                title: "Descripción",
                placeholder: "Escriba una descripción...",
                is_large: true,
                type: "input",
                validate: {}
            },
        }
    }