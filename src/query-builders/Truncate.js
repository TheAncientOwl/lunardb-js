import { assert, assertNotEmpty } from '../assert.js';

class Truncate {
  #collection = '';

  collection(collection) {
    assertNotEmpty(collection, 'Truncate collection name');
    this.#collection = collection;
    return this;
  }

  build() {
    assertNotEmpty(this.#collection, 'Truncate collection name');

    return `truncate structure ${this.#collection};`;
  }
}

// console.log(new Truncate().collection('SomeCollection').build());

export default Truncate;
