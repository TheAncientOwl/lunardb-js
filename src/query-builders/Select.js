import { assert, assertNotEmpty } from '../assert.js';

class Select {
  #from = '';
  #where = '';
  #fields = [];

  from(from_) {
    assertNotEmpty(from_, 'Select from structure name');
    this.#from = from_;
    return this;
  }

  where(where_) {
    assertNotEmpty(where_, 'Select where clause');
    this.#where = where_;
    return this;
  }

  addField(fieldName) {
    assert(typeof fieldName === 'string' && fieldName.length != 0, 'Invalid field name');
    this.#fields.push(fieldName);
    return this;
  }

  build() {
    assert(this.#fields.length != 0, 'Cannot insert no objects...');
    assertNotEmpty(this.#from, 'Select from structure name');
    assertNotEmpty(this.#where, 'Select where clause');

    return `select from structure ${this.#from} where ( ${this.#where} ) fields [ ${this.#fields.join(', ')} ];`;
  }
}

// console.log(new Select().from('SomeCollection').addField('salary').addField('name').where('1 == 1').build());

export default Select;
