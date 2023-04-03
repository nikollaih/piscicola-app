import pondStructure from "../formsStructure/pondStructure";
import { Constants } from "../../util";
export default
    {
        form_name: "Pond",
        structure: {...pondStructure},
        fields: {
            name: {
                icon: "trash-bin-sharp",
                title: "Nombre",
                placeholder: "Nombre",
                type: "input",
                validate: {
                    required: true,
                }
            },
            fecha_creacion: {
                icon: "ios-calendar",
                title: "Fecha de creación",
                placeholder: "Fecha",
                type: "date",
                format: Constants.DATETIME_FORMATS.DATETIME,
                validate: {
                    required: true,
                }
            },
            medidas: {
                title: "Medidas",
                placeholder: "",
                type: "input",
                validate: {
                    required: true,
                }
            },
            capacidad: {
                icon: "ios-map",
                title: "Capacidad",
                placeholder: "Capacidad",
                bottom: 0,
                type: "input",
                validate: {
                    required: true,
                }
            },
            estado: {
                icon: "ios-business",
                title: "Estado",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "nombre",
                item_id: "id",
                items: [
                    {
                        nombre: "Activo",
                        id: 1
                    },
                    {
                        nombre: "Inactivo",
                        id: 2
                    },
                    {
                        nombre: "Mantenimiento",
                        id: 3
                    },
                    {
                        nombre: "Ocupado",
                        id: 4
                    },
                ],
                validate: {
                    required: true,
                }
            },
        }
    }
