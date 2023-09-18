import globalState from "../globalState.js";
import containers from "./containers.js";
import buttons from "./buttons.js";
import inputs from "./inputs.js";
import ResultContainerContent from "./ResultContainerContent.js";

function InitialView() {
  return containers
    .Buttons()
    .html([buttons.view.Search(), buttons.view.ShowAll()]);
}

function SearchView() {
  const inputField = inputs.Search();
  const addContactButton = buttons.input.AddContact().hide();
  const resultContainer = containers.Result().hide();
  globalState.Root().data("input", inputField);

  inputField
    .on("input", function () {
      if (this.value.length === 0) {
        resultContainer.hide();
        addContactButton.hide();
      } else {
        const resultContainerContent = ResultContainerContent({
          filterString: this.value,
          isUpdate: true,
        });

        if (resultContainerContent.length !== 0) {
          resultContainer.show().html(resultContainerContent);
        } else {
          resultContainer.hide();
        }

        addContactButton.show();
      }
    })
    .on("keyup", function (event) {
      if (event.which === 13) {
        addContactButton.trigger("click");
      }
    });

  return $(
    [
      containers
        .Buttons()
        .html([buttons.view.ShowAll(), buttons.view.Initial()]),
      containers.Input().html([inputField, addContactButton]),
      resultContainer,
    ].map((jQueryObject) => jQueryObject[0])
  );
}

function ShowAllView() {
  return $(
    [
      containers
        .Buttons()
        .html([
          buttons.view.Search(),
          buttons.view.Update(),
          buttons.view.Initial(),
        ]),
      containers.Result().html(ResultContainerContent()),
    ].map((jQueryObject) => jQueryObject[0])
  );
}

function UpdateView() {
  return $(
    [
      containers
        .Buttons()
        .html([
          buttons.view.Search(),
          buttons.view.ShowAll(),
          buttons.view.Initial(),
        ]),
      containers.Result().html(ResultContainerContent({ isUpdate: true })),
    ].map((jQueryObject) => jQueryObject[0])
  );
}

const views = {
  Initial: InitialView,
  Search: SearchView,
  ShowAll: ShowAllView,
  Update: UpdateView,
};

export default views;
