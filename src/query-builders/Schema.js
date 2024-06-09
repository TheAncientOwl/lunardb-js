import { assert, assertNotEmpty } from '../assert.js';

class Schema {
  #fields = [];
  #inherits = [];
  #name = '';

  name(name_) {
    assertNotEmpty(name_, 'Schema name');
    this.#name = name_;
    return this;
  }

  addField(field_) {
    assert(
      typeof field_ === 'object' && 'name' in field_ && 'type' in field_,
      `Invalid field provided: ${field_.toString()}`
    );

    this.#fields.push(`${field_.name}: ${field_.type};`);
    return this;
  }

  inherits(schemaName) {
    assert(typeof schemaName === 'string' && schemaName.length !== 0, 'Invalid inherited schema name');
    this.#inherits.push(schemaName);
    return this;
  }

  build() {
    assert(this.#fields.length !== 0 || this.#inherits.length !== 0, `No fields or inherited schemas added added`);
    assertNotEmpty(this.#name, 'Schema name');

    return `schema ${this.#name}${
      this.#inherits.length !== 0 ? ` inherits ${this.#inherits[0]}` : ''
    } { ${this.#fields.join(' ')} };`;
  }
}

// console.log(
//   new Schema()
//     .name('SomeSchema')
//     .addField({ name: 'field1', type: 'string' })
//     .addField({ name: 'field2', type: 'string' })
//     .addField({ name: 'field3', type: 'string' })
//     .addField({ name: 'field4', type: 'string' })
//     .build()
// );

export default Schema;
