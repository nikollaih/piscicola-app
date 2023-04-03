import medicationStructure from "../formsStructure/medicationStructure";
import { Constants } from "../../util";

export default
    {
        form_name: "Supply",
        structure: {...medicationStructure},
        fields: {
            name: {
                icon: "ios-flask",
                title: "Nombre",
                placeholder: "Nombre",
                type: "input",
                validate: {
                    required: true,
                }
            },
            precio: {
                icon: "ios-map",
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
                icon: "ios-beaker",
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
