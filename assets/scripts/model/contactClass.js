import fields from "./fieldClasses.js";

export default class Contact {
  constructor(name) {
    this.name = name;
    this.fields = [];
    this.created = Date.now();
  }

  addField(value, fieldClassName = fields.Field.name) {
    if (!(fieldClassName in fields)) {
      throw new Error(
        `Only available field types are: ${Object.keys(fields).join(", ")}`
      );
    }

    this.fields.push(new fields[fieldClassName](value));
  }

  deleteField(value) {
    for (let i = 0; i < this.fields.length; i++) {
      if (this.fields[i].value === value) {
        this.fields.splice(i, 1);
        break;
      }
    }
  }
}
