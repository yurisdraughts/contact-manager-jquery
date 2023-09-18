class Field {
  constructor(value) {
    this.value = value;
  }
}

class URLField extends Field {
  _linkStart;

  get fullLink() {
    return this._linkStart + this.value;
  }

  hasLink = true;
}

class Address extends Field {}

class Phone extends Field {}

class Email extends Field {}

class Telegram extends URLField {
  _linkStart = "https://t.me/";
}

class VK extends URLField {
  _linkStart = "https://vk.com/";
}

export default { Field, Address, Phone, Email, Telegram, VK };
