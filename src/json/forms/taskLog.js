import taskLogStructure from '../formsStructure/taskLogStructure';
import { Constants } from '../../util';
export default
    {
        form_name: "TaskLog",
        structure: taskLogStructure,
        fields: {
            task_id: {
                icon: "ios-business",
                title: "Tarea",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "name",
                item_id: "id",
                items: [],
                validate: {
                    required: true,
                }
            },
            employee_id: {
                icon: "ios-business",
                title: "Empleado",
                placeholder: "- Seleccionar",
                type: "select",
                item_label: "full_name",
                item_id: "id",
                items: [],
                validate: {
                    required: true,
                }
            },
            started_at: {
                title: "Fecha y hora de inicio",
                placeholder: "",
                type: "date",
                format: Constants.DATETIME_FORMATS.DATETIME,
                validate: {
                    required: true
                }
            },
            finished_at: {
                title: "Fecha y hora final",
                placeholder: "",
                format: Constants.DATETIME_FORMATS.DATETIME,
                type: "date",
                validate: {
                    required: true,
                    is_greater_than: "started_at"
                }
            },
        }
    }
