import { assert, assertNotEmpty } from '../assert.js';

class User {
  #username = '';
  #password = '';
  #type = '';

  username(username_) {
    assertNotEmpty(username_, 'User username');
    this.#username = username_;
    return this;
  }

  password(password_) {
    assertNotEmpty(password_, 'User password');
    this.#password = password_;
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

    if (this.#type === 'create') {
      assertNotEmpty(this.#password, 'User password');
    }

    assertNotEmpty(this.#type, 'User type');

    return `user ${this.#type} ${this.#username}${this.#type === 'create' ? ` password ${this.#password}` : ''};`;
  }
}

// console.log(new User().create().username('SomeUser').password('passwd').build());
// console.log(new User().remove().username('SomeUser').build());

export default User;
