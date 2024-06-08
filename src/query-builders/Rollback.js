import { assert, assertNotEmpty } from '../assert.js';

class Rollback {
  #hash = '';

  hash(hash_) {
    assertNotEmpty(hash_, 'Rollback hash');
    this.#hash = hash_;
    return this;
  }

  build() {
    assertNotEmpty(this.#hash, 'Rollback hash');

    return `rollback ${this.#hash};`;
  }
}

// console.log(new Rollback().hash('d4b2758da0205c1e0aa9512cd188002a').build());

export default Rollback;
