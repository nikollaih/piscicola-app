import sowingStructure from '../formsStructure/sowingStructure';
export default
    {
        form_name: "EditSowing",
        structure: sowingStructure,
        fields: {
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
            fish_step_id: {
                icon: "ios-business",
                title: "Producto",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "select_name",
                item_id: "id",
                items: [],
                validate: {
                    required: true,
                }
            },
            total_fish: {
                title: "Cantidad de peces",
                placeholder: "1000",
                type: "input",
                keyboard_type: "numeric",
                validate: {
                    required: true
                }
            },
        }
    }
