const inputs = {
  Search() {
    return $("<input>", {
      class: "app__input",
      placeholder: "Введите имя",
    });
  },
  AddField() {
    return $("<input>", {
      class: "app__input app__input_add-field",
    });
  }
};

export default inputs;
