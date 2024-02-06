import equipmentStructure from "../formsStructure/equipmentStructure";
import { Constants } from "../../util";

export default
    {
        form_name: "Equipment",
        structure: { ...equipmentStructure },
        fields: {
            name: {
                icon: "ios-hardware-chip-sharp",
                title: "Nombre",
                placeholder: "Nombre",
                type: "input",
                validate: {
                    required: true,
                }
            },
            identifier: {
                icon: "ios-hardware-chip-sharp",
                title: "Referencia",
                placeholder: "Referencia",
                type: "input",
                validate: {
                    required: true,
                }
            },
            purchased_cost: {
                icon: "ios-cash",
                title: "Precio",
                placeholder: "$0",
                bottom: 0,
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: true,
                }
            },
            time_to_life: {
                icon: "ios-battery-charging-outline",
                title: "Vida Útil (En días)",
                placeholder: "10",
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: true,
                }
            },
            value_after_time: {
                icon: "ios-cash",
                title: "Valor final",
                placeholder: "$0",
                bottom: 0,
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: true,
                }
            },
            purchased_at: {
                icon: "ios-calendar",
                title: "Fecha de compra",
                placeholder: "Fecha",
                type: "date",
                format: Constants.DATETIME_FORMATS.DATETIME,
                validate: {
                    required: true,
                }
            },
            status: {
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
            description: {
                title: "Descripcion",
                placeholder: "",
                is_large: true,
                type: "input",
                validate: {
                    required: true
                }
            }
        }
    }
