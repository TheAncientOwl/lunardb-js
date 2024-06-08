import { assert, assertNotEmpty } from '../assert.js';

class Grant {
  #toUser = '';
  #onCollection = '';
  #permissions = [];

  toUser(toUser_) {
    assertNotEmpty(toUser_, 'Grant toUser');
    this.#toUser = toUser_;
    return this;
  }

  onCollection(onCollection_) {
    assertNotEmpty(onCollection_, 'Grant onCollection');
    this.#onCollection = onCollection_;
    return this;
  }

  permission(permission_) {
    assert(typeof permission_ === 'string' && permission_.length !== 0, 'Grant invalid permission');
    this.#permissions.push(permission_);
    return this;
  }

  build() {
    assertNotEmpty(this.#toUser, 'Grant toUser');
    assertNotEmpty(this.#onCollection, 'Grant onCollection');
    assert(this.#permissions.length !== 0, 'Grant no permission defined');

    return `grant [ ${this.#permissions.join(', ')} ] to ${this.#toUser} on ${this.#onCollection};`;
  }
}

// console.log(
//   new Grant()
//     .toUser('SomeUser')
//     .onCollection('SomeCollection')
//     .permission('update')
//     .permission('insert')
//     .permission('delete')
//     .build()
// );

export default Grant;
