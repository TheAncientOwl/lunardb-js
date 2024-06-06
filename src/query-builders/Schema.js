const { assert, assertNotEmpty } = require('../assert');

class Schema {
  #fields = [];
  #name = '';

  name(name_) {
    assertNotEmpty(name_, 'Schema name');
    this.#name = name_;
    return this;
  }

  addField(field) {
    assert(
      typeof field === 'object' && 'name' in field && 'type' in field,
      `Invalid field provided: ${field.toString()}`
    );

    this.#fields.push(`${field.name}: ${field.type};`);
    return this;
  }

  build() {
    assert(this.#fields.length != 0, `No fields added`);
    assertNotEmpty(this.#name, 'Schema name');

    return `schema ${this.#name} { ${this.#fields.join(' ')} };`;
  }
}

console.log(
  new Schema()
    .name('SomeSchema')
    .addField({ name: 'field1', type: 'string' })
    .addField({ name: 'field2', type: 'string' })
    .addField({ name: 'field3', type: 'string' })
    .addField({ name: 'field4', type: 'string' })
    .build()
);

module.exports = Schema;
