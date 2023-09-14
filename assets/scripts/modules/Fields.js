export class Field {
    constructor(value) {
        this.value = value;
    }

    static allFieldClasses = new Map();
}

Field.allFieldClasses.set('field', Field);

class URLField extends Field {
    _linkStart;

    get fullLink() {
        return this._linkStart + this.value;
    }

    hasLink = true;
}

class Address extends Field { }
Field.allFieldClasses.set('address', Address);

class Phone extends Field { }
Field.allFieldClasses.set('phone', Phone);

class Email extends Field { }
Field.allFieldClasses.set('email', Email);

class Telegram extends URLField {
    _linkStart = 'https://t.me/';
}

Field.allFieldClasses.set('telegram', Telegram);

class VK extends URLField {
    _linkStart = 'https://vk.com/';
}

Field.allFieldClasses.set('vk', VK);