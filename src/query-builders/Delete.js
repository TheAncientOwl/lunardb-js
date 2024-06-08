import { assert, assertNotEmpty } from '../assert.js';

class Delete {
  #from = '';
  #where = '';

  from(from_) {
    assertNotEmpty(from_, 'Delete from structure name');
    this.#from = from_;
    return this;
  }

  where(where_) {
    assertNotEmpty(where_, 'Delete where clause');
    this.#where = where_;
    return this;
  }

  build() {
    assertNotEmpty(this.#from, 'Delete from structure name');
    assertNotEmpty(this.#where, 'Delete where clause');

    return `delete from structure ${this.#from} where ( ${this.#where} );`;
  }
}

// console.log(new Delete().from('SomeCollection').where('1 == 1').build());

export default Delete;
