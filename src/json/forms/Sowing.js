import sowingStructure from '../formsStructure/sowingStructure';
import {Constants} from "../../util";
export default
    {
        form_name: "EditSowing",
        structure: sowingStructure,
        fields: {
            name: {
                title: "Nombre de la cosecha",
                placeholder: "Nueva cosecha",
                type: "input",
                validate: {
                    required: true
                }
            },
            fish_id: {
                title: "Producto",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "name",
                item_id: "id",
                items: [],
                validate: {
                    required: true,
                }
            },
            step_id: {
                title: "Etapa",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "name",
                item_id: "id",
                items: [],
                validate: {
                    required: true,
                }
            },
            pond_id: {
                icon: "ios-business",
                title: "Estanque",
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
                title: "Cantidad de peces",
                placeholder: "1000",
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: true
                }
            },
            manual_created_at: {
                icon: "ios-calendar",
                title: "Fecha de siembra",
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
