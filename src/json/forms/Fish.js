import fishStructure from '../formsStructure/fishStructure';
export default
    {
        form_name: "EditFish",
        structure: fishStructure,
        fields: {
            productive_unit_id: {
                icon: "ios-business",
                title: "Unidad productiva",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "name",
                item_id: "id",
                items: [],
                validate: {
                    required: true,
                }
            },
            fish_id: {
                icon: "ios-business",
                title: "Tipo de producto (Pez)",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "name",
                item_id: "id",
                items: [],
                validate: {
                    required: true,
                }
            },
            name: {
                icon: "ios-business",
                title: "Nombre de la etapa",
                placeholder: "Mojarra",
                type: "input",
                default: "",
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
                validate: {}
            },
        }
    }
