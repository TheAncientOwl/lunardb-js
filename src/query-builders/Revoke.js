import { assert, assertNotEmpty } from '../assert.js';

class Revoke {
  #fromUser = '';
  #onCollection = '';
  #permissions = [];

  fromUser(fromUser_) {
    assertNotEmpty(fromUser_, 'Revoke fromUser');
    this.#fromUser = fromUser_;
    return this;
  }

  onCollection(onCollection_) {
    assertNotEmpty(onCollection_, 'Revoke onCollection');
    this.#onCollection = onCollection_;
    return this;
  }

  permission(permission_) {
    assert(typeof permission_ === 'string' && permission_.length !== 0, 'Revoke invalid permission');
    this.#permissions.push(permission_);
    return this;
  }

  build() {
    assertNotEmpty(this.#fromUser, 'Revoke fromUser');
    assertNotEmpty(this.#onCollection, 'Revoke onCollection');
    assert(this.#permissions.length !== 0, 'Revoke no permission defined');

    return `Revoke [ ${this.#permissions.join(', ')} ] from ${this.#fromUser} on ${this.#onCollection};`;
  }
}

// console.log(
//   new Revoke()
//     .fromUser('SomeUser')
//     .onCollection('SomeCollection')
//     .permission('update')
//     .permission('insert')
//     .permission('delete')
//     .build()
// );

export default Revoke;
