const { assert, assertNotEmpty } = require('../assert');

class Database {
  #type = '';
  #name = '';
  #disk = '';

  isCreate() {
    this.#type = 'create';
    return this;
  }

  isDrop() {
    this.#type = 'drop';
    return this;
  }

  isBackup(disk_) {
    assertNotEmpty(disk_, 'Database Backup Path');
    this.#disk = disk_;
    this.#type = 'backup';
    return this;
  }

  isUse() {
    this.#type = 'use';
    return this;
  }

  name(name_) {
    assertNotEmpty(name_, 'Database Name');
    this.#name = name_;
    return this;
  }

  build() {
    assertNotEmpty(this.#type, 'Missing database query type');
    assertNotEmpty(this.#name, 'Missing name');
    return `database ${this.#type} ${this.#name} ${this.#disk};`;
  }
}

// console.log(new Database().name('SomeDatabase').isCreate().build());
// console.log(new Database().name('SomeDatabase').isUse().build());
// console.log(new Database().name('SomeDatabase').isDrop().build());
// console.log(new Database().name('SomeDatabase').isBackup('somepath').build());

module.exports = Database;
