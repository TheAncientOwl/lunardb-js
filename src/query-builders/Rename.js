import { assert, assertNotEmpty } from '../assert.js';

class Rename {
  #from = '';
  #to = '';
  #type = '';

  from(from_) {
    assertNotEmpty(from_, 'Rename from');
    this.#from = from_;
    return this;
  }

  to(to_) {
    assertNotEmpty(to_, 'Rename to');
    this.#to = to_;
    return this;
  }

  isCollection() {
    this.#type = 'collection';
    return this;
  }

  isField() {
    this.#type = 'field';
    return this;
  }

  isDatabase() {
    this.#type = 'database';
    return this;
  }

  build() {
    assertNotEmpty(this.#from, 'Rename from');
    assertNotEmpty(this.#to, 'Rename to');
    assertNotEmpty(this.#type, 'Rename type not set');

    return `rename ${this.#type} from ${this.#from} to ${this.#to};`;
  }
}

// console.log(new Rename().isDatabase().from('OldDB').to('NewDB').build());
// console.log(new Rename().isCollection().from('OldCollection').to('NewCollection').build());
// console.log(new Rename().isField().from('SomeCollection::OldField').to('SomeCollection::NewField').build());

export default Rename;
