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
            reference: {
                icon: "ios-hardware-chip-sharp",
                title: "Referencia",
                placeholder: "Referencia",
                type: "input",
                validate: {
                    required: true,
                }
            },
            price: {
                icon: "ios-cash",
                title: "Precio",
                placeholder: "$0",
                bottom: 0,
                type: "input",
                validate: {
                    required: true,
                }
            },
            useful_life: {
                icon: "ios-battery-charging-outline",
                title: "Vida Útil",
                placeholder: "10",
                type: "input",
                validate: {
                    required: true,
                }
            },
            purchase_date: {
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
        }
    }
