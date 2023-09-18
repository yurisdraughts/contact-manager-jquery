const containers = {
  Buttons() {
    return $("<div>", {
      class: "app__element-container app__element-container_buttons",
    });
  },
  Input() {
    return $("<div>", {
      class: "app__element-container app__element-container_position-relative",
    });
  },
  Result() {
    return $("<div>", { class: "app__result" });
  },
  FieldSelection() {
    return $("<div>", { class: "app__contact-add-field-buttons-container" });
  },
};

export default containers;
