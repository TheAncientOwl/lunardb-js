import { assert, assertNotEmpty } from '../assert.js';

class Drop {
  #collection = '';
  #cascade = false;

  collection(collection) {
    assertNotEmpty(collection, 'Drop collection name');
    this.#collection = collection;
    return this;
  }

  cascade(cascade_) {
    assert(typeof cascade_ === 'boolean' || cascade_ == null, 'Delete cascade is boolean');
    this.#cascade = cascade_;
    return this;
  }

  build() {
    assertNotEmpty(this.#collection, 'Drop collection name');

    return `drop structure ${this.#collection}${this.#cascade ? 'cascade' : ''};`;
  }
}

// console.log(new Drop().collection('SomeCollection').build());
// console.log(new Drop().collection('SomeCollection').cascade(true).build());

export default Drop;
