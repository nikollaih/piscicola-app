import mortalityStructure from "../formsStructure/mortalityStructure";
import { Constants } from "../../util";

export default
    {
        form_name: "Mortality",
        structure: {...mortalityStructure},
        fields: {
            approximate_weight: {
                title: "Peso aproximado",
                placeholder: "0",
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: true
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
            quantity_of_fish: {
                title: "Cantidad de peces para la muestra",
                placeholder: "100",
                bottom: 0,
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
        }
    }
