import { assert, assertNotEmpty } from '../assert.js';

class Migrate {
  #collection = '';
  #toSchema = '';
  #using = [];

  collection(collection_) {
    assertNotEmpty(collection_, 'Migrate collection');
    this.#collection = collection_;
    return this;
  }

  toSchema(toSchema_) {
    assertNotEmpty(toSchema_, 'Migrate toSchema');
    this.#toSchema = toSchema_;
    return this;
  }

  using(using_) {
    assert(typeof using_ === 'object' && 'actual' in using_ && 'new' in using_, 'Invalid using');
    this.#using.push(`${using_.actual} => ${using_.new}`);
    return this;
  }

  build() {
    assertNotEmpty(this.#collection, 'Migrate collection');
    assertNotEmpty(this.#toSchema, 'Migrate toSchema');

    return `migrate structure ${this.#collection} to ${this.#toSchema}${
      this.#using.length !== 0 ? ` using [ ${this.#using.join(', ')} ]` : ''
    };`;
  }
}

// console.log(new Migrate().collection('SomeCollection').toSchema('NewSchema').build());
// console.log(
//   new Migrate()
//     .collection('SomeCollection')
//     .toSchema('NewSchema')
//     .using({ old: 'old1', new: 'new1' })
//     .using({ old: 'old2', new: 'new2' })
//     .build()
// );

export default Migrate;
