import fishStatsStructure from "../formsStructure/fishStatsStructure";
export default {
  form_name: "FishStats",
  structure: fishStatsStructure,
  fields: {
    name: {
      icon: "ios-business",
      title: "Nombre",
      placeholder: "Temperatura",
      type: "input",
      default: "",
      validate: {
        required: true,
        min_length: 2,
      },
    },
    key: {
      icon: "ios-business",
      title: "Key",
      placeholder: "Key",
      type: "input",
      default: "",
      validate: {
        required: true,
        min_length: 5,
      },
    },
    value_minimum: {
      icon: "ios-business",
      title: "Valor minimo",
      placeholder: "0",
      type: "input",
      default: "",
      keyboard_type: "numeric",
      validate: {
        required: true
      },
    },
    value_maximum: {
      icon: "ios-business",
      title: "Valor maximo",
      placeholder: "0",
      type: "input",
      default: "",
      keyboard_type: "numeric",
      validate: {
        required: true
      },
    },
    description: {
      title: "Descripción",
      placeholder: "Escriba una descripción...",
      is_large: true,
      type: "input",
      validate: {},
    },
  },
};
