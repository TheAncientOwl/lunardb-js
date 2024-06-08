import { assert, assertNotEmpty } from '../assert.js';

class Update {
  #collection = '';
  #where = '';
  #modify = [];

  collection(collection_) {
    assertNotEmpty(collection_, 'Update collection name');
    this.#collection = collection_;
    return this;
  }

  where(where_) {
    assertNotEmpty(where_, 'Update where clause');
    this.#where = where_;
    return this;
  }

  addModify(modify) {
    assert(typeof modify === 'object' && 'field' in modify && 'expression' in modify, 'Invalid modify object');
    this.#modify.push(`${modify.field} => ${modify.expression}`);
    return this;
  }

  build() {
    assert(this.#modify.length != 0, 'Cannot modify no objects...');
    assertNotEmpty(this.#collection, 'Update collection name');
    assertNotEmpty(this.#where, 'Update where clause');

    return `update structure ${this.#collection} where ( ${this.#where} ) modify [ ${this.#modify.join(', ')} ];`;
  }
}

// console.log(
//   new Update()
//     .structure('Employees')
//     .where('name == Akshan')
//     .addModify({ field: 'salary', expression: '2000000' })
//     .build()
// );

export default Update;
