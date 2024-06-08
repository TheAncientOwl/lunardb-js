import { assert, assertNotEmpty } from '../assert.js';

class SavePoint {
  #hash = '';

  hash(hash_) {
    assertNotEmpty(hash_, 'SavePoint hash');
    this.#hash = hash_;
    return this;
  }

  build() {
    assertNotEmpty(this.#hash, 'SavePoint hash');

    return `savepoint ${this.#hash};`;
  }
}

// console.log(new SavePoint().hash('d4b2758da0205c1e0aa9512cd188002a').build());

export default SavePoint;
