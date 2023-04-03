import foodStructure from "../formsStructure/foodStructure";
import { Constants } from "../../util";

export default
    {
        form_name: "Food",
        structure: {...foodStructure},
        fields: {
            name: {
                icon: "md-fast-food",
                title: "Nombre",
                placeholder: "Nombre",
                type: "input",
                validate: {
                    required: true,
                }
            },
            precio: {
                icon: "ios-cash",
                title: "Precio",
                placeholder: "$0",
                bottom: 0,
                type: "input",
                validate: {
                    required: true,
                }
            },
            cantidad: {
                title: "Cantidad",
                placeholder: "10",
                type: "input",
                validate: {
                    required: true,
                }
            },
            unidad: {
                icon: "ios-business",
                title: "Unidad de medida",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "nombre",
                item_id: "id",
                items: [
                    {
                        nombre: "Kg",
                        id: 1
                    },
                    {
                        nombre: "L",
                        id: 2
                    },
                    {
                        nombre: "Unidades",
                        id: 3
                    },
                ],
                validate: {
                    required: true,
                }
            },
            fecha_creacion: {
                icon: "ios-calendar",
                title: "Fecha de compra",
                placeholder: "Fecha",
                type: "date",
                format: Constants.DATETIME_FORMATS.DATETIME,
                validate: {
                    required: true,
                }
            },
        }
    }
