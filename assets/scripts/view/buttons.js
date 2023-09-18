import globalState from "../globalState.js";
import renderView from "./renderView.js";
import views from "./views.js";

function Button(html, className) {
  return $("<button>", { type: "button", class: className }).html(html);
}

/* Button container */
function ChangeViewButton(html, view) {
  return Button(html, "app__button app__button_margin-right").on(
    "click",
    function () {
      renderView(view);
    }
  );
}

function SearchViewButton() {
  return ChangeViewButton("Искать или добавить", views.Search);
}

function ShowAllViewButton() {
  return ChangeViewButton("Посмотреть все", views.ShowAll);
}

function InitialViewButton() {
  return ChangeViewButton(
    [$("<i>", { class: "fa-solid fa-arrow-left" }), "&nbsp;", "В начало"],
    views.Initial
  );
}

function UpdateViewButton() {
  return ChangeViewButton("Редактировать", views.Update);
}

/* Input container */
function AddContactButton() {
  return Button("Добавить", "app__button app__button_position-absolute").on(
    "click",
    function () {
      const inputFieldValue = globalState.Root().data("input").val();

      if (!globalState.data.getContact(inputFieldValue)) {
        globalState.data.addContact(inputFieldValue);

        renderView(views.Search);
        globalState.Root().data("input").val(inputFieldValue).trigger("input");
      }
    }
  );
}

/* Result container */
function DeleteContactButton(contactName) {
  return Button(
    $("<i>", { class: "fa-solid fa-trash" }),
    "app__button app__button_delete-contact"
  )
    .attr("title", "Удалить контакт")
    .on("click", function () {
      globalState.data.deleteContact(contactName);

      const root = globalState.Root();
      const inputFieldValue = root.data("input")?.val();

      renderView(root.data("view"));

      const inputField = globalState.Root().data("input");
      if (inputFieldValue && inputField) {
        inputField.val(inputFieldValue).trigger("input");
      }
    });
}

function DeleteFieldButton(contactName, fieldValue) {
  return Button(
    $("<i>", { class: "fa-solid fa-trash" }),
    "app__button app__button_delete-field"
  )
    .attr("title", "Удалить поле")
    .on("click", function () {
      globalState.data.getContact(contactName).deleteField(fieldValue);

      const root = globalState.Root();
      const inputFieldValue = root.data("input")?.val();

      renderView(root.data("view"));

      const inputField = globalState.Root().data("input");
      if (inputFieldValue && inputField) {
        inputField.val(inputFieldValue).trigger("input");
      }
    });
}

/* Add field buttons */
function FieldButton(className, title, iconClassName, fieldType) {
  const result = Button($("<i>", { class: iconClassName }), className).attr(
    "title",
    title
  );

  if (typeof fieldType === "string") {
    result.data("field-type", fieldType);
  }

  return result;
}

function OpenFieldSelectionButton() {
  return FieldButton(
    "app__button app__button_add-field",
    "Добавить новое поле",
    "fa-solid fa-plus"
  );
}

function CloseFieldSelectionButton() {
  return FieldButton(
    "app__button app__button_add-field_close",
    "Закрыть",
    "fa-solid fa-xmark"
  );
}

function AddAddressFieldButton() {
  return FieldButton(
    "app__button app__button_add-field_address",
    "Добавить адрес",
    "fa-solid fa-location-dot",
    "Address"
  );
}

function AddPhoneFieldButton() {
  return FieldButton(
    "app__button app__button_add-field_phone",
    "Добавить номер телефона",
    "fa-solid fa-phone",
    "Phone"
  );
}

function AddEmailFieldButton() {
  return FieldButton(
    "app__button app__button_add-field_email",
    "Добавить email",
    "fa-solid fa-envelope",
    "Email"
  );
}

function AddTelegramFieldButton() {
  return FieldButton(
    "app__button app__button_add-field_telegram",
    "Добавить ссылку на Telegram",
    "fa-brands fa-telegram",
    "Telegram"
  );
}

function AddVKFieldButton() {
  return FieldButton(
    "app__button app__button_add-field_vk",
    "Добавить ссылку на страницу VK",
    "fa-brands fa-vk",
    "VK"
  );
}

function CloseAddFieldInputButton() {
  return $("<button>", {
    class: "app__button app__button_add-field_close_small",
    title: "Закрыть",
  }).append($("<i>", { class: "fa-solid fa-xmark" }));
}

const buttons = {
  view: {
    Initial: InitialViewButton,
    Search: SearchViewButton,
    ShowAll: ShowAllViewButton,
    Update: UpdateViewButton,
  },
  input: {
    AddContact: AddContactButton,
  },
  result: {
    DeleteContact: DeleteContactButton,
    DeleteField: DeleteFieldButton,
  },
  field: {
    OpenSelection: OpenFieldSelectionButton,
    CloseSelection: CloseFieldSelectionButton,
    AddAddress: AddAddressFieldButton,
    AddPhone: AddPhoneFieldButton,
    AddEmail: AddEmailFieldButton,
    AddTelegram: AddTelegramFieldButton,
    AddVK: AddVKFieldButton,
    CloseAddFieldInput: CloseAddFieldInputButton,
  },
};

export default buttons;
