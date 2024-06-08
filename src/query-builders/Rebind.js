import { assert, assertNotEmpty } from '../assert.js';

class Rebind {
  #current = '';
  #to = '';
  #clean = false;

  current(current_) {
    assertNotEmpty(current_, 'Rebind current');
    this.#current = current_;
    return this;
  }

  to(to_) {
    assertNotEmpty(to_, 'Rebind to');
    this.#to = to_;
    return this;
  }

  clean(clean_) {
    assert(typeof clean_ === 'boolean', 'Rebind clean must be boolean');
    this.#clean = clean_;
    return this;
  }

  build() {
    assertNotEmpty(this.#current, 'Rebind curr#current');
    assertNotEmpty(this.#to, 'Rebind to#to');

    return `rebind ${this.#current} to ${this.#to}${this.#clean === true ? ' clean' : ''};`;
  }
}

// console.log(new Rebind().current('SomeCollection::someField').to('SomeOtherCollection').build());
// console.log(new Rebind().current('SomeCollection::someField').to('SomeOtherCollection').clean(true).build());

export default Rebind;
