export default {
  API: {
    URL: "http://192.168.0.14/api/",
  },
  COLORS: {
    DARK: "#31322d",
    WHITE: "#fff",
    PRIMARY: "#ea580c",
    SECONDARY: "#000",
    LILA: "#e5e2ff",
    GREEN: "#5eccb4",
    LIVE_GREEN: "#44ce1b",
    GRAY: "#999999",
    LIGHT_GRAY: "#cacaca",
    IOS_BACKGROUND_GRAY: "#f9f9f9",
    YELLOW: "#ffad32",
    SOFT_YELLOW: "#ffcb79",
    RED: "#ff3b6a",
    BLUE: "#1389ea",
    BLACK_TRANSPARENT: "rgba(52, 52, 52, 0.6)",
    SOFT_BLACK_TRANSPARENT: "rgba(52, 52, 52, 0.3)",
    SUCCESS: "#25d466",
  },
  CONFIG: {
    BUTTON_OPACITY: 0.7,
    JSON: {
      SIMPLE_QUOTE: "'",
    },
    CONNECTION_ERROR_RESPONSE: "[TypeError: Network request failed]",
    HEADERS: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    CODES: {
      INVALID_TOKEN: "Unauthenticated.",
    },
  },
  CHIPER: {
    KEY: "(T,kVS{9pRKe?S,R",
  },
  LOCALSTORAGE: {
    SESSION: "session",
    LOGIN: "login",
    UPDATED: "updated_screen",
  },
  DATETIME_FORMATS: {
    DATETIME: "Y-MM-DD hh:mm a",
    DATE: "Y-MM-DD",
    TIMEZONE: "YYYY-MM-DDTHH:mm:ss.SSSZ",
  },
  USERS_TYPES: {
    ADMIN: 1,
    UNIT_MANAGER: 2,
  },
  USE_TYPES: [{ id: "ALIMENT", name: "Alimento" }, { id: "MEDICINE", name: "Medicina" }],
};
