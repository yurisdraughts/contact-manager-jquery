import { Contact } from './Contact.js';

export class ContactManager {
    constructor() {
        this._contacts = {};
    }

    getContact(name) {
        return this._contacts[name];
    }

    addContact(name) {
        this._contacts[name] = new Contact(name);
    }

    deleteContact(name) {
        delete this._contacts[name];
    }

    get allContacts() {
        return Object.values(this._contacts).sort((current, next) => {
            return next.created - current.created;
        });
    }
}