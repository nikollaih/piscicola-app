import paymentTypesStructure from "../formsStructure/paymentTypeStructure";

export default
    {
        form_name: "paymentTypes",
        structure: paymentTypesStructure,
        fields: {
            name: {
                icon: "ios-person",
                title: "Nombre",
                placeholder: "Por horas",
                type: "input",
                validate: {
                    required: true,
                    min_length: 5
                }
            },
            description: {
                title: "Descripción",
                placeholder: "Escriba una descripción...",
                type: "input",
                is_large: true,
                validate: {
                    required: true
                }
            },
            required_tasks: {
                icon: "ios-calendar",
                title: "Requiere tareas",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "name",
                item_id: "id",
                items: [
                    { id: true, name: "Si"},
                    { id: false, name: "No"},
                ],
                validate: {}
            },
        }
    }
