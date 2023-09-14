import { ContactManager } from "./modules/ContactManager.js";

$(function () {
  $(".background").on("mousemove", function (event) {
    const mousePosition = Math.hypot(
      event.clientX / this.offsetWidth,
      event.clientY / this.offsetHeight
    );

    const basePercent = 25,
      percentRange = 50,
      adjustablePercent = percentRange * mousePosition;

    const gradientPercent = basePercent + adjustablePercent;

    this.style.setProperty("--middle-point", `${gradientPercent}%`);
  });

  const contactManager = new ContactManager();

  contactManager.addContact("борис");
  contactManager.addContact("Аня");
  contactManager.addContact("ЕЛЕНА");
  contactManager.getContact("борис")?.addField("+333333333", "phone");
  contactManager.getContact("борис")?.addField("sbjknb", "telegram");
  contactManager.getContact("Аня")?.addField("kjvsvnsldkvn", "vk");
  contactManager.getContact("ЕЛЕНА")?.addField("hjhvkv@kjvhvhv.kh", "email");
  contactManager.getContact("ЕЛЕНА")?.addField("пр. Седова, д. 1/1", "address");

  console.log(contactManager.allContacts);
});
