import { assert, assertNotEmpty } from '../assert.js';

class Commit {
  build() {
    return 'commit;';
  }
}

// console.log(new Commit().build());

export default Commit;
