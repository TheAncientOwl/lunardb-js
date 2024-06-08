import { assert, assertNotEmpty } from '../assert.js';

class User {
  #username = '';
  #type = '';

  username(username_) {
    assertNotEmpty(username_, 'User username');
    this.#username = username_;
    return this;
  }

  create() {
    this.#type = 'create';
    return this;
  }

  remove() {
    this.#type = 'remove';
    return this;
  }

  build() {
    assertNotEmpty(this.#username, 'User username');
    assertNotEmpty(this.#type, 'User type');

    return `user ${this.#type} ${this.#username};`;
  }
}

// console.log(new User().create().username('SomeUser').build());
// console.log(new User().remove().username('SomeUser').build());

export default User;
