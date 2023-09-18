import ContactManager from "./contactManagerClass.js";

const contactManager = new ContactManager();

contactManager.addContact("Юрий");
contactManager.getContact("Юрий")?.addField("yumatv93", "Telegram");
contactManager.getContact("Юрий")?.addField("yurisdraughts@yandex.ru", "Email");

export default contactManager;
