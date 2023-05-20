import productiveUnitStructure from '../formsStructure/productiveUnit';
export default
    {
        form_name: "EditProductiveUnit",
        structure: productiveUnitStructure,
        fields: {
            manager_id: {
                icon: "ios-person",
                title: "Encargado",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "full_name",
                item_id: "id",
                items: [],
                validate: {
                    required: true,
                }
            },
            name: {
                icon: "ios-business",
                title: "Nombre de la unidad productiva",
                placeholder: "Nombre",
                type: "input",
                default: "Asorobles",
                validate: { 
                    required: true,
                    min_length: 5
                }
            },
            description: {
                title: "Descripción",
                placeholder: "Escriba una descripción...",
                is_large: true,
                type: "input",
                validate: {
                    required: true,
                    min_length: 5
                }
            },
            address: {
                icon: "ios-map",
                title: "Ubicación",
                placeholder: "Ubicación",
                bottom: 0,
                type: "input",
                validate: {
                    required: true,
                    min_length: 5
                }
            }
        }
    }
