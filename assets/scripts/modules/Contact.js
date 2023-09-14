import { Field } from './Fields.js'

export class Contact {
    constructor(name) {
        this.name = name;
        this.fields = [];
        this.created = Date.now();
    }

    addField(value, fieldClassName = Field.className) {
        const FieldClass = Field.allFieldClasses.get(fieldClassName);
        this.fields.push(new FieldClass(value));
    }

    deleteField(value) {
        for (let i = 0; i < this.fields.length; i++) {
            if (this.fields[i].value === value) {
                this.fields.splice(i, 1);
                return;
            }
        }
    }
}