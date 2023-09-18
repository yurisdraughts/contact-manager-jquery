import contactManager from "./model/contactManagerInstance.js";

const globalState = {
  data: contactManager,
  Root: () => $("#app"),
};

export default globalState;
