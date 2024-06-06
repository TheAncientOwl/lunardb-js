const { assert, assertNotEmpty } = require('../assert');

class Insert {
  #into = '';
  #objects = [];

  into(into_) {
    assertNotEmpty(into_, 'Insert into structure name');
    this.#into = into_;
    return this;
  }

  addObject(object) {
    this.#objects.push(
      JSON.stringify(object, (key, value) => {
        return key === '' ? value : JSON.stringify(value);
      })
    );
    return this;
  }

  build() {
    assert(this.#objects.length != 0, 'Cannot insert no objects...');
    assertNotEmpty(this.#into, 'Insert structure name');

    return `insert into ${this.#into} objects [ ${this.#objects.join(' ')} ];`;
  }
}

// console.log(
//   new Insert()
//     .into('SomeCollection')
//     .addObject({ name: 'Bob', salary: 4000 })
//     .addObject({ name: 'George', salary: 4500 })
//     .addObject({ name: 'Akshan', salary: 1000000 })
//     .build()
// );

module.exports = Insert;
