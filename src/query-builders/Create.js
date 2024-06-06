const { assert, assertNotEmpty } = require('../assert');

class Create {
  #type = '';
  #name = '';
  #schema = '';

  isTable() {
    this.#type = 'table';
    return this;
  }

  isDocument() {
    this.#type = 'collection';
    return this;
  }

  name(name_) {
    assertNotEmpty(name_, 'Create name');
    this.#name = name_;
    return this;
  }

  schema(schema_) {
    assertNotEmpty(schema_, 'Create schema');
    this.#schema = schema_;
    return this;
  }

  build() {
    assertNotEmpty(this.#type, 'Create structure type');
    assertNotEmpty(this.#name, 'Create structure name');
    assertNotEmpty(this.#schema, 'Create schema');

    return `create ${this.#type} ${this.#name} based on ${this.#schema};`;
  }
}

// console.log(new Create().name('SomeCollection').schema('SomeSchema').isDocument().build());
// console.log(new Create().name('SomeCollection').schema('SomeSchema').isTable().build());

module.exports = Create;
