import globalState from "../globalState.js";
import buttons from "./buttons.js";
import inputs from "./inputs.js";
import renderView from "./renderView.js";

function getLink(
  to,
  text,
  { isPhone, isMail } = { isPhone: false, isMail: false }
) {
  const href = isPhone ? "tel:" + to : isMail ? "mailto:" + to : to;
  return $("<a>", { href }).text(text);
}

function getFieldClass(field) {
  let className = "";

  switch (field.constructor.name) {
    case "Phone":
      className = "fa-solid fa-phone";
      break;
    case "Telegram":
      className = "fa-brands fa-telegram";
      break;
    case "VK":
      className = "fa-brands fa-vk";
      break;
    case "Email":
      className = "fa-solid fa-envelope";
      break;
    case "Address":
      className = "fa-solid fa-location-dot";
      break;
  }

  return $("<div>", {
    class: "app__contact-field-class",
  }).html($("<i>", { class: className }));
}

function getFieldValue(field) {
  let fieldValue = $("<div>", {
    class: "app__contact-field-value",
  });

  switch (field.constructor.name) {
    case "Phone":
      fieldValue.html(getLink(field.value, "позвонить", { isPhone: true }));
      break;

    case "Telegram":
      fieldValue.html(getLink(field.fullLink, "ссылка"));
      break;

    case "VK":
      fieldValue.html(getLink(field.fullLink, "ссылка"));
      break;

    case "Email":
      fieldValue.html(
        getLink(field.value, "написать письмо", { isMail: true })
      );
      break;

    case "Address":
      fieldValue.html(field.value);
      break;
  }

  return fieldValue;
}

function getContactName(contact, isUpdate) {
  return $("<div>", { class: "app__contact-name" }).html([
    $("<span>").text(contact.name),
    isUpdate ? buttons.result.DeleteContact(contact.name) : "",
  ]);
}

function getUpdateButtons(contact) {
  const {
    OpenSelection,
    CloseSelection,
    AddAddress,
    AddPhone,
    AddEmail,
    AddTelegram,
    AddVK,
    CloseAddFieldInput,
  } = buttons.field;

  const { AddField } = inputs;

  const state1Elements = [OpenSelection().on("click", gotoState2)];

  const state2Elements = [
    ...[
      AddAddress().hide(),
      AddPhone().hide(),
      AddEmail().hide(),
      AddTelegram().hide(),
      AddVK().hide(),
    ].map((button) => {
      return button.on("click", function () {
        gotoState3(button.data("field-type"));
      });
    }),
    CloseSelection().hide().on("click", gotoState1),
  ];

  const state3Elements = [
    AddField()
      .hide()
      .on("keyup", function (event) {
        if (event.which === 13) {
          gotoState2();
          contact.addField($(this).val(), $(this).data("field-type"));

          const root = globalState.Root();
          const searchValue = root.data("input").val();

          renderView(root.data("view"));
          globalState.Root().data("input").val(searchValue).trigger("input");
        }
      }),
    CloseAddFieldInput().hide().on("click", gotoState2),
  ];

  function gotoState1() {
    [...state2Elements, ...state3Elements].forEach((element) => element.hide());
    state1Elements.forEach((element) => element.show());
  }

  function gotoState2() {
    [...state1Elements, ...state3Elements].forEach((element) => element.hide());
    state2Elements.forEach((element) => element.show());
  }

  function gotoState3(fieldType) {
    let placeholder = "";

    switch (fieldType) {
      case "Address":
        placeholder = "Введите адрес:";
        break;

      case "Phone":
        placeholder = "Введите номер телефона:";
        break;

      case "Email":
        placeholder = "Введите email:";
        break;

      case "Telegram":
        placeholder = "Введите имя пользователя Telegram:";
        break;

      case "VK":
        placeholder = 'Введите адрес страницы VK (без начального "vk.com/"!):';
        break;
    }

    [...state1Elements, ...state2Elements].forEach((element) => element.hide());
    state3Elements.forEach((element) => {
      element.show();

      if (element.is("input")) {
        element.attr("placeholder", placeholder).data("field-type", fieldType);
      }
    });
  }

  return $("<div>", {
    class: "app__contact-add-field-buttons-container",
  }).append([...state1Elements, ...state2Elements, ...state3Elements]);
}

function getContactFields(contact, isUpdate) {
  const fields = contact.fields.map((field) => {
    return $("<div>", { class: "app__contact-field" }).html([
      getFieldClass(field).append(
        isUpdate ? buttons.result.DeleteField(contact.name, field.value) : ""
      ),
      getFieldValue(field),
    ]);
  });

  return [...fields, isUpdate ? getUpdateButtons(contact) : ""];
}

function getContactFieldsWrapper(contactFields) {
  return $("<div>", {
    class: "app__contact-field-list",
  }).html(contactFields);
}

function ResultContainerContent(
  { isUpdate = false, filterString = null } = {
    isUpdate: false,
    filterString: null,
  }
) {
  const resultContainerContent = globalState.data.contacts
    .filter((contact) => {
      if (filterString === null) {
        return true;
      }

      return contact.name.toLowerCase().includes(filterString.toLowerCase());
    })
    .map((contact) => {
      const contactName = getContactName(contact, isUpdate);
      const contactFields = getContactFields(contact, isUpdate);
      const contactFieldsWrapper = getContactFieldsWrapper(contactFields);

      return $("<div>", { class: "app__contact" }).html([
        contactName,
        contactFieldsWrapper,
      ]);
    });

  return resultContainerContent;
}

export default ResultContainerContent;
